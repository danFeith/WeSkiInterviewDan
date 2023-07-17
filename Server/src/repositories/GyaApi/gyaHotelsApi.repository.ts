import axios from "axios";
import { SearchHotelSettings } from "../../dto/searchHotels.dto";
import { HotelsAbstractApi } from "../hotelsAbstractApi.repository";
import { GyaApiDto } from "./gyaApi.dto";
import eventEmitter, { RECIEVED_HOTELS_LIST_EVENT, HOTELS_API_FAILD } from "../../EventEmmiter";
import { HotelCommonSchema } from "../../types";

export class GyaApiRepository extends HotelsAbstractApi {

    constructor() {
        super("https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator")
    }

    searchHotels(searchSettings: SearchHotelSettings, userSessionId: string) {
        const allRequestedSettings: GyaApiDto[] = this.adjustGeneralDtoToApiDto(searchSettings)
        
        allRequestedSettings.forEach((currentSettings) => {
            
            axios.post(this.api_url, currentSettings).then((res) => {
                if(res.data.statusCode == 200){
                    let hotelsList = this.schemaReplacer(res.data)
                    eventEmitter.emit(RECIEVED_HOTELS_LIST_EVENT, {data: hotelsList, userSessionId: userSessionId})
                }
            }).catch((e) => {
                eventEmitter.emit(HOTELS_API_FAILD, e?.message)
            })

        })
    }

    adjustGeneralDtoToApiDto(searchSettings: SearchHotelSettings): GyaApiDto[] {

        const dtoArr: GyaApiDto[] = []
        for (let i: number = searchSettings.min_group_size; i <= searchSettings.max_group_size; i++) {
            dtoArr.push({
                query: {
                    ski_site: searchSettings.ski_site,
                    from_date: searchSettings.from_date,
                    to_date: searchSettings.to_date,
                    group_size: i
                }   
            })
        }

        return dtoArr
    }

    schemaReplacer(apiResponse: any): HotelCommonSchema[] {

        return apiResponse.body.accommodations.reduce((hotelarr: HotelCommonSchema[], hotel: any) => {

            let imgUrl: string = hotel.HotelDescriptiveContent.Images.find((imgObj: any) => imgObj.MainImage == true )
            return [...hotelarr, {
                hotelName: hotel.HotelName,
                mainImageUrl: imgUrl || "../../assets/default-hotel.png",
                rating: Number(hotel.HotelInfo.Rating),
                price: Number(hotel.PricesInfo.AmountAfterTax),
                
            }]
        }, [])
    }
}

export default new GyaApiRepository()