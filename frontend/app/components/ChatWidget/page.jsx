
"use client"
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import io from 'socket.io-client';
import { getUser } from '../../../api/authService';
import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const socket = io(BASE_URL); // Connect to the backend

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(); // Fetch logged-in user data
        setUserData(data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData._id) {
      axios.get(`${BASE_URL}/api/chat/${userData._id}`)
        .then(response => {
          if (response.data) {
            setMessages(response.data.messages);
            setConversationId(response.data._id);
          }
        })
        .catch(err => console.error('Error fetching chat:', err));
    }
  }, [userData]);

  useEffect(() => {
    socket.on('receive_message', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSend = async () => {
    if (message.trim() && userData) {
      const newMessage = {
        senderId: userData._id,
        receiverId: null, // Admin will pick the chat later
        message,
        conversationId: conversationId || undefined,
      };

      try {
        const response = await axios.post(`${BASE_URL}/api/chat/send`, newMessage);
        socket.emit('send_message', response.data); // Send to Socket.IO
        setMessages(prev => [...prev, response.data.messages.slice(-1)[0]]); // Add the latest message
        setConversationId(response.data._id);
        setMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 max-sm:w-60 w-80 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="p-4 bg-orange-500 text-white font-bold">Chat with Us</div>
          <div className="p-4 h-60 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${msg.sender === userData._id ? 'bg-orange-100 text-right' : 'bg-gray-100 text-left'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex items-center p-2 border-t ">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 outline-none max-sm:w-20"
            />
            <button
              onClick={handleSend}
              className="bg-orange-500 text-white max-sm:px-1 px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
