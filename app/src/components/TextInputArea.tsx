import { ChangeEvent, FC, KeyboardEvent } from 'react';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

const TextInputArea: FC<Props> = (props) => {
  const onEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onSubmit();
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Input
        value={props.value}
        onChange={props.onChange}
        onKeyDown={onEnterKeyDown}
      />
      <Button variant="contained" onClick={props.onSubmit}>
        送信する
      </Button>
    </Stack>
  );
};

export default TextInputArea;
