import { SearchHotelSettings } from "../dto/searchHotels.dto";
import { HotelCommonSchema } from "../types";

export abstract class HotelsAbstractApi {

    protected api_url: string

    constructor(url: string){
        this.api_url = url
    }

    public abstract searchHotels(searchSettings: SearchHotelSettings, userSessionId: string): void
    
    protected abstract adjustGeneralDtoToApiDto(searchSettings: SearchHotelSettings): any

    protected abstract schemaReplacer(apiResponse: any): HotelCommonSchema[]

}