import React from 'react';
import SendMessage from './components/SendMessage';
import GetMessages from './components/GetMessage';

const App: React.FC = () => (
  <>
    <SendMessage />
    <GetMessages />
  </>
);

export default App;