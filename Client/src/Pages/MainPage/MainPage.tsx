import React, { useState, useEffect, useContext } from 'react';
import './mainPage.css';
import { WebsocketContext } from '../../Contexts/websocketContext'
import axios from 'axios';
import { API_URL } from '../../config';
import Logo from '../../assets/Logo.png';
import { Destinations } from '../../destinations';
import Cookies from 'universal-cookie';
import HotelCard from '../../Components/HotelCard';
import Picker from '../../Components/Picker/picker';



function MainPage() {
    
    const cookies: Cookies = new Cookies()
    const [ready, val, send] = useContext(WebsocketContext);
    const [hotels, setHotels] = useState<any[]>([])
    const [isDestinationsListOpen, setIsDestinationListOpen] = useState(false)
    const [selectedDestination, setSelectedDestination] = useState(1)
    const [resultDestination, setResultDestination] = useState(1)
    const [isGroupSizeOpen, setIsGroupSizeOpen] = useState(false)
    const [selectedGroupSize, setSelectedGroupSize] = useState(1)
    const GROUP_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    useEffect(() => {
        if (val.type == "connection_success") {
            cookies.set("ws_connection_id", val.content.userId)
        }

        if (val.type == "hotels_list") {
            console.log(val.content)
            setHotels([...hotels, ...val.content].sort((hotelA, hotelB) => { return hotelA.price - hotelB.price }))
            setResultDestination(selectedDestination)
        }

    }, [val])



    const getHotels = (): void => {
        setHotels([])
        axios.post(`${API_URL}/hotels/search`, {
            ski_site: selectedDestination,
            from_date: "03/04/2024",
            to_date: "03/11/2024",
            group_size: selectedGroupSize
        }, { withCredentials: true })

    }

    const displayHotels = () => {
        return hotels.reduce((hotelsDisplayArr, hotel) => {
            return [
                ...hotelsDisplayArr,
                <HotelCard hotel={hotel} resultDestination={resultDestination}></HotelCard>
            ]
        }, [])
    }



    return (
        <div className="main-page">
            <div className="top-bar">
                <div className="logo">
                    <img src={Logo} style={{ width: "126px", height: "20px" }}></img>
                </div>
                <Picker setIsOpen={setIsDestinationListOpen} isOpen={isDestinationsListOpen} selected={Destinations[selectedDestination - 1].name}></Picker>
                <Picker setIsOpen={setIsGroupSizeOpen} isOpen={isGroupSizeOpen} selected={selectedGroupSize}></Picker>
                <Picker setIsOpen={() => { }} isOpen={null} selected={"Dates"}></Picker>
                <div className='search-container'>
                    <div className='search-button' onClick={getHotels}> search</div>
                </div>
            </div>
            <div className='selection-container'>
                <div className='blank-space'></div>
                {(isGroupSizeOpen && !isDestinationsListOpen) ? <div className='blank-space-for-group-size'></div> : null}
                {(isDestinationsListOpen) ? <div className='detenation-selection-list'>
                    {Destinations.map((dest) => {
                        return <div className='item' onClick={() => { setSelectedDestination(dest.id); setIsDestinationListOpen(false) }}> {dest.name}</div>
                    })}
                </div> : null}

                {(isGroupSizeOpen) ? <div className='detenation-selection-list'>
                    {GROUP_SIZES.map((size) => {
                        return <div className='item' onClick={() => { setSelectedGroupSize(size); setIsGroupSizeOpen(false) }}> {size}</div>
                    })}
                </div> : null}

            </div>


            <div className='hotel-list'>
                {displayHotels()}
            </div>
        </div>
    );
}

export default MainPage;
