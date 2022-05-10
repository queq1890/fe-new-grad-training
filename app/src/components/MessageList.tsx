import { FC } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

type Props = {
  messageList: string[];
};

const MessageList: FC<Props> = (props) => {
  return (
    <Stack spacing={1}>
      {props.messageList.map((message) => {
        return <Box>{message}</Box>;
      })}
    </Stack>
  );
};

export default MessageList;
