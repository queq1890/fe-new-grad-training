import { ChangeEvent, useState } from 'react';
import TextInputArea from './components/TextInputArea';

import MessageList from './components/MessageList';
import { Box, Stack, Typography } from '@mui/material';
import Profile from './components/Profile';

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
    <Stack spacing={4}>
      <Box>
        <Typography variant="h4">チャット</Typography>
        <MessageList messageList={messageList} />
        <TextInputArea
          value={message}
          onChange={onMessageChange}
          onSubmit={onMessageSubmit}
        />
      </Box>
      <Box>
        <Typography variant="h4">プロフィール</Typography>
        <Profile />
      </Box>
    </Stack>
  );
}

export default App;
