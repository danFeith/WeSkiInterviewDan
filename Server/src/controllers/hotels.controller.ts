import { Request, Response } from "express";
import { SearchHotelSettings, ClientSearchHotelSettings } from "../dto/searchHotels.dto";
import gyaHotelsApiRepository from "../repositories/GyaApi/gyaHotelsApi.repository";
import { HotelsAbstractApi } from "../repositories/hotelsAbstractApi.repository";

const MAX_GROUP_SIZE = 10

export const startHotelsSearch = (req: Request<never, never, ClientSearchHotelSettings>, res: Response): any => {
    const allApiRepos: HotelsAbstractApi[] = [gyaHotelsApiRepository]
    
    const searchSettings: SearchHotelSettings = {
        ski_site: req.body.ski_site,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        min_group_size: req.body.group_size,
        max_group_size: MAX_GROUP_SIZE,
    }


    allApiRepos.forEach((apiRepo: HotelsAbstractApi) => {
        apiRepo.searchHotels(searchSettings, req.cookies.ws_connection_id)
    })

    res.status(200).send();
}