"use client";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const socket = io(BASE_URL);

const AdminChatPanel = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  const handleChatSelect = async (chat) => {
    setCurrentChat(chat);

    try {
      const response = await axios.get(`${BASE_URL}/api/chat/${currentChat?.user._id}`);
      // setMessage(response.data.message);
     
      socket.emit('join_chat', currentChat?.user._id);
      setMessage(response.data.messages)
    } catch (err) {
      console.error(err);
    }
  };
      // console.log(message,"message")


  // const sendMessage = async () => {
  //   if (newMessage.trim() && currentChat) {
  //     const messageData = {
  //       conversationId: currentChat?._id,
  //       senderId: 'admin',
  //       message: newMessage,
  //     };

  //     try {
  //       await axios.post('http://localhost:5000/api/chat/send', messageData);
  //       socket.emit('send_message', messageData);
  //       setMessage(prevMessage => [...prevMessage, messageData]);
  //       setNewMessage('');
  //     } catch (err) {
  //       console.error('Error sending message:', err);
  //     }
  //   }
  // };
  // console.log(currentChat?._id,"currentChat")
  const sendMessage = async () => {
    if (newMessage.trim() && currentChat) {
      const messageData = {
        conversationId: currentChat._id, // ID of the selected conversation
        senderId: '6773eef147f5f5e4115bcfc9', // Admin's ID (or dynamic sender)
        message: newMessage,
      };
  
      try {
        const response = await axios.post(`${BASE_URL}/api/chat/send`, messageData);
        socket.emit('send_message', messageData);
  
        // Update UI with the new message
        setMessage(prevMessage => [...prevMessage, messageData]);
        setNewMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };
  


  useEffect(() => {
    socket.connect();

    // Fetch active conversations
    axios.get(`${BASE_URL}/api/chat/conversations`)
      .then(response => setActiveChats(response.data))
      .catch(err => console.error(err));

    socket.on('receive_message', (message) => {
      if (currentChat && message.conversationId === currentChat._id) {
        setMessage(prevMessage => [...prevMessage, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentChat]);

  
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Active Chats</h2>
        {activeChats.map((chat) => (
          <div
            key={chat._id}
            className={`p-3 cursor-pointer hover:bg-gray-200 ${
              currentChat?._id === chat._id ? 'bg-gray-300' : ''
            }`}
            onClick={() => handleChatSelect(chat)}
          >
            {chat.user.name}
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col bg-white p-4">
        {currentChat ? (
          <>
            <h2 className="text-xl font-bold mb-4">Chat with {currentChat.user.name}</h2>
            <div className="flex-1 overflow-y-auto border p-4 mb-4">
            {message && Array.isArray(message) && message.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${msg.senderId === 'admin' ? 'text-right' : 'text-left'}`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.senderId === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 border rounded-lg p-2 mr-2"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPanel;
