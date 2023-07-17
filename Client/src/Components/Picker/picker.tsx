import React, { useState, useEffect } from 'react';
import './picker.css';

function Picker({ isOpen, setIsOpen, selected  }: { isOpen: any, setIsOpen: any, selected: any }) {


    return (
        <div className='picker-container'>
        <div className='picker' onClick={() => setIsOpen(!isOpen)} >
            {selected}
        </div>
    </div>
    );
}

export default Picker;
