import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(()=> {
        const {username, roomName} = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setUsername(username);
        setRoomName(roomName);

        socket.emit('join', { username, roomName }, () => {

        }); 

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search])
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat;