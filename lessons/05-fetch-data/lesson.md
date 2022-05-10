# 05. API から data を fetch してみよう

本チャプターでは、以下の作業をします。

- async/await を使った非同期処理
- GitHub API からユーザーの情報を取得する

入力されたユーザーネームに基づいて、[GitHub の users API](https://docs.github.com/en/rest/users/users#get-a-user) からユーザーの情報を取得する UI を考えてみます。

## 🚓 チャプターを開始する前に

本チャプターでは、JavaScript / TypeScript で非同期処理を扱う方法である Async function / await を利用します。JavaScript / TypeScript における非同期処理の解説を書くことを試みましたが、あまりにもトピックとして膨大になってしまうため、本チュートリアル上で解説する代わりに、参考になるドキュメントへのリンクを記載します。つきまして、本チャプターを開始する前に、`JavaScript Primer`　で`非同期処理:コールバック/Promise/Async Function` のページを確認しておくことを強く推奨します。

- [非同期処理:コールバック/Promise/Async Function · JavaScript Primer #jsprimer](https://jsprimer.net/basic/async/#async-handling)

## MessageArea component のリファクタリング

以下のような振る舞いを考えてみます。

- ユーザーが GitHub のユーザーネームを input に入力する
- 入力が完了したら GitHub の API にリクエストを送り、ユーザーの情報を fetch する
  - ユーザーが存在する場合、ユーザーの情報を React component として表示する
  - ユーザーが存在しない場合、ユーザーが見つからなかった旨をメッセージとして表示する

ユーザーが GitHub のユーザーネームを入力する部分は、既に実装済みの `MessageArea` component を使いまわすことができそうです。
ただ、`message` 以外の string value も受け取れることが分かる命名に変更したいので、ファイルの名前と component の名前を、 `TextInputArea` に変更します。また、`props.message` についても、`props.value` に rename しましょう。

```tsx
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
  // 省略
};

export default TextInputArea;
```

## Profile component の作成

次に、GitHub Users API から data を fetch して、ユーザーの情報を表示する Profile component を定義していきます。ひとまず、先程リファクタした MessageArea component を render するところまで実装してみます。

```tsx
import { ChangeEvent, FC, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextInputArea from './TextInputArea';

const Profile: FC = () => {
  const [userName, setUserName] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onSubmit = async () => {
    // TODO API からdata をfetch する
  };

  return (
    <Stack spacing={1}>
      <TextInputArea value={userName} onChange={onChange} onSubmit={onSubmit} />
    </Stack>
  );
};

export default Profile;
```

ここまで実装できたら、App component で Profile component を render するようにしてみます。ユーザーが文字を入力できる箇所が 2 箇所になるため、Box と Typography component を MUI から import して、何に対応する Input かでセクションを区切ってみましょう。

```tsx
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
```

ここまで実装すると、以下の画像のような状態になっていることが期待されます。

![./images/render-profile.png]

## GitHub Users API から data を fetch する

### onSubmit の実装

それでは、Profile component の `onSubmit` 関数の実装をしていきましょう。JavaScript / TypeScript プロジェクトで、HTTP Request を伴う非同期処理を実装する際には、[axios](https://github.com/axios/axios) がよく用いられますが、今回は JavaScript 標準の data fetch 機構である　[fetch](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch) API を使って実装していきます。

[GitHub の users API](https://docs.github.com/en/rest/users/users#get-a-user) の doc によると、特定のユーザーのプロフィールを取得したい場合は、`https://api.github.com/users/${userName}` というエンドポイント を利用すれば良いようです。 `fetch` の完了を待ってから、`response.json()` を実行したいため、 `await` キーワードを使って `fetch` の完了を待つ必要があることを runtime に伝えます。`response.json()` も非同期な処理になるため、こちらにも　`await` を付与しています。

```tsx
const onSubmit = async () => {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const data = await response.json();
};
```

`fetch` API を使った request が、エラーなく完了したかどうかは、 `response.ok` という boolean の値で判断できます。`response.ok` が true の場合に、data を `console.log()` でブラウザの開発者ツールに print してみましょう。

```tsx
const onSubmit = async () => {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const data = await response.json();

  if (response.ok) {
    console.log(data);
  }
};
```

ここまで実装できたら、TextInputArea に自分の GitHub のユーザーネームを入力し、「送信する」ボタンを押してみましょう。上手く実装できていれば、ブラウザの開発者ツール上に、API から取得したデータが出力されているはずです。

![./images/console.png]

### fetch した data を state として保持する

続いて、取得したデータを state として保持する実装していきます。
取得したデータを確認すると、company / bio / blog など、様々な情報が返却されているのが確認できます。今回の実装では、login / name / avatar_url の 3 つの key/value のみを使うので、これら 3 つ key を持った型を `type` を使って定義しましょう。

```tsx
type GitHubProfile = {
  login: string;
  name: string;
  avatar_url: string;
};
```

次に、`useState` を使って、取得した data を保持する state を定義しましょう。

```tsx
const [profile, setProfile] = useState<GitHubProfile | undefined>(undefined);
```

API から fetch する前は、profile の data は存在しないため、`undefined` で初期化しています。また、`GitHubProfile` と `undefined` の 2 つの型許容する state にしたいため、generics は　`GitHubProfile | undefined` のような Union Type にします。
state も用意できたので、`onSubmit` の内部で、data を state に set する処理を書きましょう。

```tsx
const onSubmit = async () => {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  // 型注釈でdata の型をGitHubProfile だと宣言する
  const data: GitHubProfile = await response.json();

  if (response.ok) {
    // 取得したdata をprofile にset する
    setProfile(data);
  }
};
```

### 条件付きで profile の情報を表示する

最後に、 `profile` state の値を使って、JSX 内でプロフィールの情報を render する実装していきます。
`profile` は `GitHubProfile | undefined` 型であるため、undefined な場合には表示できるデータがないことになります。「profile が undefined ではないこと」を `if` を使ってチェックしたくなりますが、JSX の内部では `if` を使うことができません。そこで、 `&&` operator を使って、左辺が truthy な時に右辺を render する、というテクニックを利用していきます。

```tsx
import { ChangeEvent, FC, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextInputArea from './TextInputArea';

// Profile の描画に使うcomponent をimport しておく
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

type GitHubProfile = {
  login: string;
  name: string;
  avatar_url: string;
};

const Profile: FC = () => {
  // 省略
  return (
    <Stack spacing={1}>
      {/* profile の値がtruthy な場合に　<Card /> をrender する */}
      {profile && (
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
      )}
      <TextInputArea value={userName} onChange={onChange} onSubmit={onSubmit} />
    </Stack>
  );
};

export default Profile;
```

以下の画像のように、profile の fetch 後に以下の画像のようにカードが表示されれば、条件付きの render が実装できていることになります。

![conditinal-render.png]

※React.js には他にも条件付きで render する内容を切り替えるテクニックが存在しています。気になる方は、[公式ドキュメント](https://ja.reactjs.org/docs/conditional-rendering.html) をご覧ください。

## チャレンジ

- 1. ユーザーの情報が表示されているカードをクリックした際に、そのユーザーの GitHub のプロフィールページを新しいタブで開く実装をしてみましょう。
  - 例: queq1890 のカードをクリックした場合 => https://github.com/queq1890 を新しいタブで開く
- 2. 現在の Profile component の `onSubmit` は、ユーザーのプロフィールの fetch に成功した場合のロジックしか実装されていません。存在しない userName が指定された場合など、ユーザーのプロフィールの fetch に失敗した場合に、「ユーザーの情報が取得できませんでした」というエラーメッセージを Profile component 内で render する実装をしてみましょう。

## まとめ

今回のチャプターでは、async/await を使った非同期処理と、条件付きで render を行う実装をしました。本チュートリアルは、ここまでで必須のチャプターは終了となります。
浅く広く React.js + TypeScript の stack に振れることを目的にしているチュートリアルなので、ここまでコードを書いてきても、「あの文法の意味がよく分からなかった」「動作はするがなぜ動くのかよく分からない」といった疑問も残っているでしょう。
チュートリアル内で説明を省略してしまった箇所の補足や、このチュートリアル終了後の学習の指針などについてのドキュメントを、`appendix/` ディレクトリ以下に追加しておきますので、興味のある方はそちらもご覧ください。

改めて、お疲れさまでした！

##　参考資料

- [非同期処理:コールバック/Promise/Async Function · JavaScript Primer #jsprimer](https://jsprimer.net/basic/async/#async-handling)
- [型の互換性 - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/type-system/type-compatibility)
- [条件付きレンダー - React](https://ja.reactjs.org/docs/conditional-rendering.html)
