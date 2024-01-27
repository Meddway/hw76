import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const SendMessage: React.FC = () => {
  const [author, setAuthor] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = async () => {
    try {
      if (!author || !newMessage) {
        console.error('Author and message must be provided.');
        return;
      }

      await fetch('http://localhost:8000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage, author }),
      });

      setNewMessage('');
      setAuthor('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <Box m={3}>
        <TextField
          id="authorInput"
          name="author"
          className="inputName"
          type="text"
          placeholder="Enter name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Box>
      <Box m={3}>
        <TextField
          id="messageInput"
          name="message"
          className="inputMessage"
          type="text"
          placeholder="Enter message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </Box>
      <Box m={3}>
        <Button className="btnSendMessage" variant="contained" onClick={handleSendMessage}>
          Send Message
        </Button>
      </Box>
    </div>
  );
};

export default SendMessage;
