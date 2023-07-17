import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

export default eventEmitter
export const RECIEVED_HOTELS_LIST_EVENT = "RECIEVED_HOTELS_LIST_EVENT"
export const HOTELS_API_FAILD = "HOTELS_API_FAILD"