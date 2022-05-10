# 04. React component に状態を持たせてみよう

本チャプターでは、以下の作業を行っていきます。

- `useState` hook を使った状態管理
- React の SyntheticEvent を使った、ユーザーの操作に応じた振る舞いの実装

前回のチャプターまでで、`messageList` を props として受け取る MessageList component の定義まで行うことができました。ただし、肝心の `messageList` は、`const messageList = [...]` のように定義されており、現時点では `messageList` の中身を変更する手段がないため、実質ハードコードと変わらない状態になっています。そこで、 `messageList` を、React Function component 内で可変な状態として保持する方法を考えていきます。

## `useState` hook を使った状態管理

React.js には `hooks` と呼ばれる API が存在しています。 hooks は、React 独自の機能を React Function component 内で利用できるようにするための関数群のことで、`useState` `useEffect` のように、`use` という prefix で始まる名称になっています。
複数ある hooks のうち、 `useState` は React Function component 内で利用可能な状態 (以下 慣習に習い state と記載) を使うための hook です。

```jsx
import React, { useState } from 'react';

function Example() {
  // [現在のstate の値, state を更新するための関数] = useState(初期値) のように定義する
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* setCount を呼び出し、state を更新する */}
      {/* ボタンをclick するたびcount が1増える */}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

上記のコードは、React.js の公式ドキュメントに記載されている `useState` の使用例です。`useState` は返り値として、現在の state の値、state を更新するための関数を配列で返却します。これを、[Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) という JavaScript の記法を使い、`count` `setCount` とそれぞれ命名しながら変数として定義しています。また、`useState` は state の初期値を引数に取ることができるため、`0` を渡して、`count` が `0` で初期化されるようにしています。

`count` の値を変更したい場合は、`setCount` 関数を呼び出して、任意の値をセットできます。上記の例だと、button 要素の `onClick` に、 `setCount(count + 1)` という記述をしており、ボタンをクリックするたびに `count` が現在の値 + 1 されるようになっています。

## React の SyntheticEvent

JavaScript には [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) という考え方が存在します。「ユーザーがある要素をクリックした時」「ユーザーがある要素にマウスをホバーした時」「ユーザーがキーボードを押した時」「ユーザーが文字を入力した時」など、ユーザーが行った操作に応じて、何かロジックを実装するための機構です。React.js では、「ある component に対して event が発生した時」という状態を分かりやすく扱うため、[SyntheticEvent](https://ja.reactjs.org/docs/events.html) という機構が採用されています。簡単に説明すると、`on<イベント名>` のような prop に関数を渡すと、該当するイベントがその component に対して発生した際に、渡した関数を実行してくれる、という仕組みです。

```jsx
<button onClick={() => setCount(count + 1)}>Click me</button>
```

先程の例だと、button に `onClick` というイベントが設定されていました。これは「この component が click された時」に発生するイベントなので、ユーザーがボタンをクリックすると、渡されている `() => setCount(count + 1)` が実行され、 `count` の値が増える、という仕組みになっていました。

## ユーザーがメッセージを入力できる Component の作成

それでは、`useState` hook と、SyntheticEvent を使って、ユーザーが文字を入力できる component を作成してみましょう。`src/componnets` 以下に、`MessageArea.tsx` を作成し、以下のように記述してください。

```tsx
import { ChangeEvent, FC } from 'react';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type Props = {
  message: string;
  onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const MessageArea: FC<Props> = (props) => {
  return (
    <Stack direction="row" spacing={2}>
      <Input value={props.message} onChange={props.onMessageChange} />
      <Button variant="contained">送信する</Button>
    </Stack>
  );
};

export default MessageArea;
```

props から、 Input に入力された値である`message` と、 `message` を更新するための関数である`onMessageChange` を受け取っています。`message` は Input の値である `value`に割り当てられ、 `onMessageChange` は、`onChange` という、対象の component に何か値の変化があった時に発火する SyntheticEvent に割り当てられています。 `onChange` は `ChangeEvent` という型の event を引数に取り、今回 event が発火する Input component が内部的には HTML の input 要素を使っているため、「input 要素で発火する ChangeEvent である」ということを型で表現するため、 `ChangeEvent<HTMLInputELement>` のような、generics を交えた記載を行っています。

また、ロジックはまだ実装しませんが、ユーザーが入力したメッセージをメッセージ一覧に追加するための、Button component も render しています。

それでは、作成した MessageArea component を、`App.tsx` で render してみましょう。

```tsx
import { ChangeEvent, useState } from 'react';
import MessageArea from './components/MessageArea';
import MessageList from './components/MessageList';

// TODO: ユーザーの入力によってmessageList が可変になるようになる
const messageList = ['こんにちは', 'テスト', 'ですです'];

function App() {
  const [message, setMessage] = useState('');

  const onMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <MessageList messageList={messageList} />
      <MessageArea message={message} onMessageChange={onMessageChange} />
    </div>
  );
}

export default App;
```

`useState` を使って、`message` という state と、message を更新するための関数である、`setMessage` を定義しています。また、`event: ChangeEvent<HTMLInputElement>` を引数にとる関数`onMessageChange`を定義し、MessageArea の`onMessageChange` prop に渡しています。onMessageChange 内で、`event.target.value` を `setMessage()` に渡している理由が気になる方は、event.target.value の値を console.log() で確認したり、 `setMessage(event.target.value)` の部分を削除した場合に、どのような挙動になるかを確認してみると良いでしょう。

```tsx
const onMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
  // event.target.value は新しい値
  // setMessage にevent.target.value を渡すことで、message の値を更新する
  setMessage(event.target.value);
};
```

## 入力された内容を messageList に追加するロジックの実装

ここまでで、ユーザーが入力した情報を、React.js の state とし、App component 内で保持できるようになりました。次は、`messageList` の定義を `useState`　を使ったものに変更し、「送信する」ボタンを押した時に、`message` state の値が `messageList` に追加されるように改修してみましょう。まずは MessageArea component で、「送信する」ボタンを押した時に実行したい関数を props から渡します。

```tsx
import { ChangeEvent, FC } from 'react';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type Props = {
  message: string;
  onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMessageSubmit: () => void;
};

const MessageArea: FC<Props> = (props) => {
  return (
    <Stack direction="row" spacing={2}>
      <Input value={props.message} onChange={props.onMessageChange} />
      <Button variant="contained" onClick={props.onMessageSubmit}>
        送信する
      </Button>
    </Stack>
  );
};

export default MessageArea;
```

`onMessageSubmit` が関数として追加されました。次に、App component 側で、`messageList`を`useState` で書き換えつつ、`onMessageSubmit` を定義していきます。

```tsx
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
```

`messageList` を`useState` で定義する際に、`useState<string[]>` のような形で、generics を使って `messageList` の型を明示的に宣言しています。これは、`messageList` が `[]` という空の配列で初期化されているため、TypeScript は「messageList が配列であることは分かるが、中身の要素の型が分からない」状態になってしまい、`setMessageList(['foo'])` のように、string の要素を持った配列を使ってのちのち state を更新しようとしても、型エラーになってしまうためです。初期化の時点で明示的に `string[]` 型の state であることを示すことによって、`setMessageList` 実行時の型エラーを防いでいます。

```tsx
// messageList はstring の配列であると宣言
const [messageList, setMessageList] = useState<string[]>([]);

// generics がないと、TypeScript は初期値の `[]`という中身のない配列しか型の手がかりが得られず、messageList にstring の要素が入ることを推論できない
const [messageList, setMessageList] = useState([]);
```

`onMesssageSubmit` の内部では、2 つの処理を実行しています。

- `message` の値を、`messageList` 配列の最後尾に追加する
- `message` の値を `''`にすることで、入力をクリアする

`useState` の、state 更新関数は、`setFoo(新しい値)` のような使い方の他に、`setFoo(現在の値 => 新しい値)` という使い方をすることもできます。現在の state の値を参照しながら、新しい state を設定したい時に役立ちます。
今回は、 現在の`messageList` の配列に、`message` を加えた新しい配列を作って `messageList` の値を更新したい、というケースなので、`setFoo(現在の値 => 新しい値)` のパターンを利用しています。

さて、setMessageList 内で、新たに返却される state を記述している箇所を見ると、`[...currentMessageList, message]` という記述がされています。　`...currentMessageList` の部分は、[Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) と呼ばれ、配列・オブジェクトの中身を全て展開するのに利用されます。この構文は、ある配列・オブジェクトの中身を全てコピーした新しい配列を作成したい時に役に立ちます。

```ts
const arr = ['a', 'b'];

// Spread syntax を使ってarr の中身を全て展開
const copy = [...arr];
// copy の中身は['a', 'b']
```

よって、`[...currentMessageList, message]` は、`currentMessageList` の中身を全てコピーしつつ、配列の末尾に `message` という要素を追加した新しい配列を作る、という意味になります。

```tsx
setMessageList((currentMessageList) => [...currentMessageList, message]);
```

「送信する」ボタンを押してメッセージを一覧に追加した後は、入力をクリアするために、空文字列('') を message に set しています。

```tsx
setMessage('');
```

## チャレンジ

現在は、「送信する」ボタンの `onClick` イベントでのみ、`onMessageSubmit` が呼ばれるようになっています。例えば、ユーザーが Enter キーをキーボードで押した時にも、`onMessageSubmit` を呼ぶには、どのような改修をすればよいでしょうか？
MessageArea component の実装を改修して、Enter キーを押した時にも、`onMessageSubmit` が実行されるようにしてみてください。

## まとめ

今回のチャプターでは React.js の hooks と SyntheticEvent を使って、MessageArea component を実装しました。次のチャプターでは、外部の API から data を fetch して、React.js アプリケーション上に表示する実装を行います。
お疲れさまでした！☕

## 参考資料

- [フックの導入 - React](https://ja.reactjs.org/docs/hooks-intro.html)
- [合成イベント - React](https://ja.reactjs.org/docs/events.html)
- [スプレッド構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
