import React from 'react';

import './section.css';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const Messages = ({messages, username}) => {
    return (
        <ScrollToBottom className="messages"> 
            {messages.map((message, i) => (
                <div key={i}>
                    <Message message={message} username={username} />
                </div>
            )
            )}
        </ScrollToBottom>
    )
}

export default Messages