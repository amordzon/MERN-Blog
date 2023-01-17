import socketIOClient from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import Moment from 'moment';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const GET_CHAT_MESSAGES_EVENT = 'getChatMessages';
const SOCKET_SERVER_URL = 'http://localhost:3000';

const useChat = (user) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);
        socketRef.current.on(GET_CHAT_MESSAGES_EVENT, (messages) => {
            const messagesReduced = messages.reduce((prev, curr) => {
                return [
                    ...prev,
                    {
                        body: curr.message,
                        user: curr.user?._id,
                        senderId: curr.user?._id,
                        name: curr.user?.name,
                        time: Moment(curr.createdAt).format('LT'),
                        ownedByCurrentUser: user?.user._id == curr.user?._id,
                    },
                ];
            }, []);
            setMessages(messagesReduced);
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
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
            user: user.user._id,
            senderId: socketRef.current.id,
            name: user?.user.name,
            time: Moment().format('LT'),
        });
    };

    return { messages, sendMessage };
};

export default useChat;
