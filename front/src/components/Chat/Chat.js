import React from 'react';
import useChat from './useChat';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Chat = () => {
    const { user: currentUser, isLogged } = useSelector(
        (state) => state.persistedReducer.auth
    );
    const { messages, sendMessage } = useChat(currentUser);
    const [newMessage, setNewMessage] = React.useState('');

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (isLogged) {
            sendMessage(newMessage);
            setNewMessage('');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have to be logged in!',
            });
        }
    };

    return (
        <div className="mt-12 flex flex-col items-center justify-center w-full min-h-[32rem] lg:min-h-[24rem] xl:min-h-[28rem] bg-gray-100 text-gray-800 ">
            <h1 className="font-semibold text-gray-800 ">CHAT ONLINE</h1>
            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                <Messages messages={messages} />
                <div className="bg-gray-300 p-4">
                    <form className="flex" onSubmit={handleSendMessage}>
                        <input
                            className="flex items-center h-10 w-10/12 rounded px-3 text-sm"
                            type="text"
                            placeholder="Type your message…"
                            onChange={handleNewMessageChange}
                            value={newMessage}
                        />
                        <button type="submit" className="w-2/12">
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
