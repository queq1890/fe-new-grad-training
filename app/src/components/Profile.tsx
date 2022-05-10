import { ChangeEvent, FC, useState } from 'react';
import TextInputArea from './TextInputArea';
import {
  Card,
  Avatar,
  CardHeader,
  Stack,
  Link,
  Typography,
} from '@mui/material';

type GitHubProfile = {
  login: string;
  name: string;
  avatar_url: string;
};

const Profile: FC = () => {
  const [userName, setUserName] = useState('');
  const [profile, setProfile] = useState<GitHubProfile | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onSubmit = async () => {
    setProfile(undefined);

    const response = await fetch(`https://api.github.com/users/${userName}`);
    const data: GitHubProfile = await response.json();

    if (response.ok) {
      setProfile(data);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Stack spacing={1}>
      {profile && (
        <Link
          href={`https://github.com/${profile.login}`}
          underline="none"
          target="_blank"
        >
          <Card
            sx={{
              width: 300,
            }}
          >
            <CardHeader
              avatar={<Avatar src={profile.avatar_url} />}
              title={profile.name}
              subheader={profile.login}
            />
          </Card>
        </Link>
      )}
      {error && (
        <Typography
          sx={{
            color: `error.main`,
          }}
        >
          ユーザーの情報が取得できませんでした
        </Typography>
      )}

      <TextInputArea value={userName} onChange={onChange} onSubmit={onSubmit} />
    </Stack>
  );
};

export default Profile;
