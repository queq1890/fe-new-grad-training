import { ChangeEvent, useState } from 'react';
import MessageArea from './components/MessageArea';
import MessageList from './components/MessageList';

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<string[]>([]);

  const onMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onMessageSubmit = () => {
    setMessageList((currentMessageList) => [...currentMessageList, message]);
    setMessage('');
  };

  return (
    <div>
      <MessageList messageList={messageList} />
      <MessageArea
        message={message}
        onMessageChange={onMessageChange}
        onMessageSubmit={onMessageSubmit}
      />
    </div>
  );
}

export default App;
