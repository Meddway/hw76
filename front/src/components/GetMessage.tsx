import React, { useEffect, useState } from 'react';
import PostMessage from './PostMessage';
import { Button } from '@mui/material';
import dayjs from 'dayjs';

const url = 'http://localhost:8000/messages';

interface Props {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

const GetMessages: React.FC<Props> = () => {
  const [messagesUser, setMessagesUser] = useState<Props[]>([]);
  const [lastDate, setLastDate] = useState<string | null>(null);

  const generateRandomKey = () => Math.random().toString(36);

  const getMessages = async () => {
    try {
      const urlWithDatetime = lastDate ? `${url}?datetime=${lastDate}` : url;
      const response = await fetch(urlWithDatetime);
      const messagesUser: Props[] = await response.json();

      const messagesWithKeys = messagesUser.map((message) => ({
        ...message,
        id: generateRandomKey(),
      }));

      setMessagesUser((prevMessages) => [...messagesWithKeys, ...prevMessages]);
      setLastDate(
        messagesUser.length > 0 ? messagesUser[messagesUser.length - 1].datetime : lastDate
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      void getMessages();
    }, 3000);
    return () => clearInterval(interval);
  }, [lastDate]);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={getMessages}>
        Refresh Messages
      </Button>
      {messagesUser.slice().reverse().map((message) => (
        <PostMessage
          key={message.id}
          message={message.message}
          author={message.author}
          datetime={dayjs(message.datetime).format('DD.MM.YYYY HH:mm')}
        />
      ))}
    </div>
  );
};

export default GetMessages;
