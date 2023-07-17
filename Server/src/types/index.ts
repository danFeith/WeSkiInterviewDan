export type HotelCommonSchema = {
    hotelName: string,
    mainImageUrl: string,
    rating: number,
    price: number,
}

export type WebSocketTriggerEvent = {
    data: any,
    userSessionId: string
}

export type WSMessageFormat = {
    type: string,
    content: any
}