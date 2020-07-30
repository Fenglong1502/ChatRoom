import React from 'react';

import './section.css';

const InfoBar = ({ roomName }) => {
    return (
        <div>
            <div className="infoBar">
                <div className="leftInnerContainer"> 
                    <h3>{roomName}</h3>
                </div>
            </div>
        </div>
    )
}

export default InfoBar