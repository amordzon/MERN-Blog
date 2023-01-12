import socketIOClient from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:3000';
import Moment from 'moment';

const useChat = (user) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            console.log(message);
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });
    }, []);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            name: user?.user.name,
            time: Moment().format('LT'),
        });
    };

    return { messages, sendMessage };
};

export default useChat;
