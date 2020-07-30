import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './JoinRoom.css';

const JoinRoom = () => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');

    return (
        <div className="joinRoomOuterContainer">
            <div className="joinRoomContainer">
                <h1 className="heading">Join Room</h1>
                <div>
                    <input placeholder="Enter an username" className="joinPageInput" type="text" onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Enter a room name" className="joinPageInput" type="text" onChange={(event) => setRoomName(event.target.value)} />
                </div>
                <Link onClick={event => (!username || !roomName) ? event.preventDefault() : null} to={`./chat?username=${username}&roomName=${roomName}`}>
                    <button className="joinButton" type="submit"> Join Room </button>
                </Link>
            </div>
        </div>
    )
}

export default JoinRoom;