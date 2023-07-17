import { NextFunction, Request, Response, Router } from 'express'
import * as hotelsController from "../controllers/hotels.controller";
import { validator } from '../validations';
import * as searchHotelsValidation from '../validations/searchHotels.validation'


const hotelsRoutes = Router();

hotelsRoutes.post(
    "/search",
    validator.body(searchHotelsValidation.searchHotelBodySchema),
    hotelsController.startHotelsSearch
);


export default hotelsRoutes;