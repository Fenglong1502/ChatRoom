import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000';

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
        <div className="">
            <div className="">
                <input 
                value={message} 
                onChange={(event) => { setMessage(event.target.value)}}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }
                />
            </div>
        </div>
    )
}

export default Chat;