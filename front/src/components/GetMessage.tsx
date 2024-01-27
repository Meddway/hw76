import React, { useEffect, useState } from 'react';
import PostMessage from './PostMessage';
import { Container } from '@mui/material';

interface Message {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

const GetMessages: React.FC = () => {
  const [messagesUser, setMessagesUser] = useState<Message[]>([]);
  const [lastDate, setLastDate] = useState<string | null>(null);

  const generateRandomKey = () => Math.random().toString(36);

  const getMessages = async () => {
    try {
      const urlWithDatetime = lastDate ? `http://localhost:8000/messages?datetime=${lastDate}` : 'http://localhost:8000/messages';
      const response = await fetch(urlWithDatetime);

      if (!response.ok) {
        console.error('Failed to fetch messages:', response.status, response.statusText);
        return;
      }

      const newMessages: Message[] = await response.json();

      const filteredNewMessages = newMessages.filter(
        (newMsg) => !messagesUser.some((existingMsg) => existingMsg.id === newMsg.id)
      );

      const messagesWithKeys = filteredNewMessages.map((message) => ({
        ...message,
        id: generateRandomKey(),
      }));

      setMessagesUser((prevMessages) => [...prevMessages, ...messagesWithKeys]);

      setLastDate(
        messagesWithKeys.length > 0 ? messagesWithKeys[messagesWithKeys.length - 1].datetime : lastDate
      );
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      void getMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [lastDate]);

  return (
    <Container>
      {messagesUser.slice().reverse().map((message) => (
        <PostMessage
          key={message.id}
          message={message.message}
          author={message.author}
          datetime={message.datetime.slice(0, 16)}
        />
      ))}
    </Container>
  );
};

export default GetMessages;