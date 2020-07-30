import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from './Sections/InfoBar';
import Messages from './Sections/Messages';
import TextBox from './Sections/TextBox';

let socket;

const Chat = ({location}) => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'https://chatroom-app-1.herokuapp.com/';

    useEffect(()=> {
        const {username, roomName} = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setUsername(username);
        setRoomName(roomName);

        socket.emit('join', { username, roomName }, (error) => {
            if(error) {
                alert(error);
            }
        }); 

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [ messages ])

    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
        <div className="container">
            <InfoBar roomName={roomName} />
            <Messages messages={messages} username={username}/>
            <TextBox message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;