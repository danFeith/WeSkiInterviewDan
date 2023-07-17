import React, { useState, useEffect } from 'react';
import './HotelCard.css';
import HotelDefault from '../assets/default-hotel.png';
import StarIcon from '../assets/Star.svg';
import LocationIcon from '../assets/location_circle.svg';
import { Destinations } from '../destinations';



function HotelCard({ hotel, resultDestination }: { hotel: any, resultDestination: number }) {

    const getStarsDsisplayAccordingToRading = (rating: number) => {
        const startDisplayArr = []
        for (let i = 0; i < rating; i++) {
            startDisplayArr.push(<img src={StarIcon} style={{ width: "20px", height: "20px" }}></img>)
        }
        return startDisplayArr
    }


    return (
        <div className='hotel-container'>
            <div className='img-container'>
                <img src={HotelDefault} style={{ width: "100%", height: "100%" }}></img>
            </div>
            <div className='hotel-info-container'>
                {hotel.hotelName}
                <div className='stars-container'>
                    {getStarsDsisplayAccordingToRading(hotel.rating)}
                </div>
                <div className='location-container'>
                    <img src={LocationIcon} style={{ width: "20px", height: "20px" }}></img>
                    {Destinations[resultDestination - 1].name}
                </div>
                <div className='price-container'>
                    £{hotel.price}<span className='per-person'>/per person</span>
                </div>
            </div>
        </div>
    );
}

export default HotelCard;
