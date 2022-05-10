import { ChangeEvent, FC, KeyboardEvent } from 'react';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type Props = {
  message: string;
  onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMessageSubmit: () => void;
};

const MessageArea: FC<Props> = (props) => {
  const onEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onMessageSubmit();
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Input
        value={props.message}
        onChange={props.onMessageChange}
        onKeyDown={onEnterKeyDown}
      />
      <Button variant="contained" onClick={props.onMessageSubmit}>
        送信する
      </Button>
    </Stack>
  );
};

export default MessageArea;
