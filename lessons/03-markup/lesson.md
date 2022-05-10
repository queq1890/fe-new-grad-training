# 3.マークアップをしてみよう

本チャプターでは、以下の作業を行っていきます。

- TypeScript を使った 関数・変数 の定義
- 不要なコード・ファイルの削除
- UI ライブラリの導入
- React component の作成

本チャプター完了時点で、以下のスクリーンショットのような、チャット UI のメッセージの一覧部分が実装されることを目標に作業していきます。

## JavaScript / TypeScript での変数・関数宣言

実際に React.js アプリケーションの実装を始める前に、JavaScript / TypeScript における変数・関数宣言の方法を確認しましょう。

### 変数宣言

JavaScript での変数宣言には、一般的に `const` が利用されます。

```javascript
const foo = 'bar';

const arr = [1, 3, 5];
```

上記は `bar` という string な値を持つ変数 `foo` を定義する例です。`const` を使って定義された変数は、再代入をすることができない読み取り専用の値になります。

```javascript
const foo = 'bar';
// const を使って定義された変数に再代入をすることはできない
// 下記の記述はエラーになる
foo = 'baz';
// => Uncaught TypeError: Assignment to constant variable.
```

実装するロジックによっては、再代入可能な方が簡潔に実装できる可能性があります。そのような変数を定義したい場合は、`let` を用いると良いでしょう。

```javascript
let foo = 'bar';
// let を使って定義された変数は再代入できる
foo = 'baz';
```

`const` / `let` の他にも、`var` というキーワードを使って変数を定義することができますが、`var` には同じ名前の変数を再定義できてしまうという問題があります。
また、var には巻き上げで呼ばれる、実装者にとって直感的ではない振る舞いが存在しています。そのため、現代の JavaScript を用いた開発では、`var` はほぼ用いられず、`const` / `let` のみで変数定義が行われるのが通例となっています。

```javascript
// 同じ名前の変数が定義できてしまう
var foo = 'bar';
var foo = 100;

console.log(foo);
// => 100
```

TypeScript は、JavaScript に型システムを追加している以外の文法は、JavaScript と基本的に同じであるため、変数宣言も JavaScript と同様の記法で行うことができます。

```typescript
const foo = 'bar';

let hoge = 'fuga';
```

TypeScript では、変数の宣言時に、明示的に変数の型を指定することができます。これは `型注釈 (Type Annotation)` と呼ばれます。再代入可能な変数で、代入可能な値の型を指定したい場合や、配列・オブジェクトのメンバの型を指定したい場合に利用すると良いでしょう。
明示的に型注釈をつけない場合は、TypeScript のコンパイラが変数に代入されている値から、変数の型を推測して、自動で型を付与します。この仕組を`型推論(Type Assertion)` といいます。

```typescript
// hoge はstring 型であると明示的に指定
let hoge: string = 'fuga';

// hoge はstring 型であるため、number 型の値である123 を代入するとType Error になる
hoge = 123;
// => Type 'number' is not assignable to type 'string'
```

```typescript
// foo の型は明示的に宣言されていないが、はじめに代入されている値がstring 型の値であるため、TypeScript はfoo をstring 型として扱う
let foo = 'bar';

// foo はstring 型であるため、number 型の値である123 を代入するとType Error になる
foo = 123;
// => Type 'number' is not assignable to type 'string'
```

### 関数宣言

JavaScript で関数を宣言する際には、`function` キーワードを使う方法と、`arrow function` を使う方法の 2 種類の記法が利用できます。
以下はいずれも実行時に `console.log()` を実行し、引数に取った文字列`arg`を出力します。

```javascript
// function キーワードを使う方法
function logInFunction(arg) {
  console.log(arg);
}

// Arow function `() => {}` を使う方法
const logInArrowFunction = (arg) => {
  console.log(arg);
};
```

どちらの方法も広く利用されていますが、プロジェクトによっては統一性の観点から、`function` のみを使う・`arrow function` のみを使うといった具合に、利用する記法を絞る場合もあります。

TypeScript を用いる場合でも、上記 2 種の記法を利用することができます。関数の定義時には、関数の引数と、関数の返り値に型注釈をつけることができます。

```typescript
// void は返り値がないという意味

function logInFunction(arg: string): void {
  console.log(arg);
}

const logInArrowFunction = (arg: string): void => {
  console.log(arg);
};

// 返り値がstring であるfunction の例
// `${}` はtemplate literal という文字列の中で変数を使うための記法
// ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals
const formatJPY = (price: number): string => {
  return `${number}円`;
};

const priceInJPY = formatJPY(100);
// => '100円'
```

※ここまでの TypeScript の変数宣言・関数宣言を雑に試したい場合は、[TypeScript Playground](https://www.typescriptlang.org/play) がおすすめです。

### JSX / TSX

React.js を使って Component を定義する際には、`JSX` という構文が利用されます。

```jsx
const element = <div>hello world</div>;
```

`JSX (JavaScript XML)`は JavaScript 上で HTML のような記法を扱えるようにするための拡張構文です。
JavaScript には本来存在しない構文なのですが、babel / tsc などのコンパイラが JSX を解釈できるように build の設定を拡張することによって、通常の JavaScript の構文と同様に扱えるようになっています。
`create-react-app` が JSX の変換の設定を裏側で行っているため、明示的な設定を行わずとも JSX の構文を扱えるようになっています。
`JSX` を扱う際、ファイルの拡張子は`.js` ではなく、`.jsx` になります。

TypeScript でこれらの構文を利用する場合は、`TSX` と呼ばれ、ファイルの拡張子は `.tsx` となります。

`JSX` については、React.js の公式ドキュメントにも記載があるのでのページがあるので、併せてご確認ください。

- 英語: https://reactjs.org/docs/introducing-jsx.html
- 日本語: https://ja.reactjs.org/docs/introducing-jsx.html

## 不要なコード・ファイルの削除

それでは、いよいよ React.js アプリケーションの実装に移りましょう。前回、create-react-app を用いて、作成したアプリケーションのディレクトリを任意のエディタで開いてください。
そして、CLI 上で `npm run start` を実行し、dev server が http://localhost:3000 で起動している状態にしてください。

```bash
npm run start
```

前チャプターで作成したディレクトリには、本チュートリアルでは使用しないファイル・コードも生成されています。まずはこれらを削除して、これから行う実装の準備をします。
以下のファイルを削除してください。

- `src/App.test.tsx`
- `src/App.css`
- `src/index.css`
- `src/logo.svg`

その後、`app.tsx` を開き、`app.css` と `logo.svg` の import を削除してください。

```diff
 import React from 'react';
-import logo from './logo.svg';
-import './App.css';

 function App() {
-  return (
-    <div className="App">
-      <header className="App-header">
-        <img src={logo} className="App-logo" alt="logo" />
-        <p>
-          Edit <code>src/App.tsx</code> and save to reload.
-        </p>
-        <a
-          className="App-link"
-          href="https://reactjs.org"
-          target="_blank"
-          rel="noopener noreferrer"
-        >
-          Learn React
-        </a>
-      </header>
-    </div>
-  );
+  return <div>test</div>;
 }

 export default App;
```

その後、`index.tsx` を開き、`index.css` の import を削除してください。

```diff
 import React from 'react';
 import ReactDOM from 'react-dom/client';
-import './index.css';
 import App from './App';
 import reportWebVitals from './reportWebVitals';
```

## UI ライブラリの導入

今回は UI ライブラリとして、[MUI](https://mui.com/material-ui) を導入していきます。 `MUI` は 元々 `Material UI` という名前で提供されていた、Google の [Material Design](https://material.io/design) を元に開発された、UI コンポーネントライブラリです。人が直接 HTML/CSS を書くと、実装者によって設計がブレたり、デザインの意図とは異なるコンポーネントの使い方をしたりしてしまう可能性があります。デザインの品質を保つための指針・原則と、それらを実現するためのコンポーネントライブラリ・ドキュメントなど、一連の仕組みのことをまとめてデザインシステムと呼びます。Material Design は Google のブランド・思想を表現するためのデザインシステムであり、そのコンポーネントライブラリの実装の一端として `MUI` が存在しています。

MUI は近年の React.js アプリケーション開発でマークアップの選択肢の 1 つとして広く採用されており、また、今回は生の CSS を書く手間を省いて React.js の実装を中心に取り扱いたいため、`MUI` をインストールして利用してみましょう。
[MUI のドキュメント](https://mui.com/material-ui/getting-started/installation/#npm)に沿って、以下のコマンドを実行してください。

```bash
$ npm install @mui/material @emotion/react @emotion/styled
```

`@mui/material` が MUI の本体になりますが、`@emotion/*`という prefix から始まるライブラリを 2 つ同時にインストールしています。これは、MUI が[emotion](https://emotion.sh/docs/introduction) という CSS in JS ライブラリに内部的に依存しているためです。

> Material UI is using emotion as a styling engine by default.

MUI で利用できる色を追加したり、フォントを変更したりといったテーマのカスタマイズを行いたい場合は、別途作業が必要なのですが、今回は default のテーマをそのまま使うので、ここまでで MUI のインストールは完了です。
※テーマのカスタマイズが気になる方は、MUI の[theming のドキュメント](https://mui.com/material-ui/customization/theming/) をご覧ください。

## React component の作成

### MessageList component をハードコードする

それでは、インストールした MUI を利用しつつ、React Component を作成してみましょう。
`src` 配下に、`components` というディレクトリを作り、`components` 配下に `MessageList.tsx` というファイルを作成してください。
その後、`src/components/MessageList` を開き、次のように記述してください。

```tsx
import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// TODO: message の配列を受け取り、それをJSX 内でrender する
const MessageList: FC = () => {
  return (
    <Stack>
      <Box>こんにちは</Box>
      <Box>どんもー</Box>
      <Box>お腹すいた</Box>
    </Stack>
  );
};

export default MessageList;
```

`FC` は React.js の React Function Component の型です。自分の定義した `MessageList` という arrow function を用いた関数が、JSX を返却する React component であることを明示的にするために、型注釈を用いています。

```tsx
import { FC } from 'react';

// MessageList は `FC` 型である
const MessageList: FC = () => {
```

`Stack` `Box` は mui から import された React component です。 Stack は一定間隔を開けながら要素を並べるために利用され、Box は HTML でいう `div` タグのように機能する、要素の Wrapper となる基礎的な component です。
チャット UI の、メッセージが縦に積み重なっていく見た目を作るために、一番外側に Stack を配置して、内側にメッセージを配置してみましょう。

```tsx
const MessageList: FC = () => {
  return (
    <Stack>
      <Box>こんにちは</Box>
      <Box>どんもー</Box>
      <Box>お腹すいた</Box>
    </Stack>
  );
};
```

最後に、このファイルで定義した `MessageList` component を他のファイルから import できるように、default export しています。

```tsx
export default MessageList;
```

次に、定義した MessageList componnet を、`App.tsx` で import して描画してみましょう。

```tsx
import MessageList from './components/MessageList';

function App() {
  return (
    <div>
      <MessageList />
    </div>
  );
}

export default App;
```

### props 経由で message の配列を MessageList component に渡す

ここまでで、MessageList component を App component 配下で描画することができるようになりました。しかし、MessageList は「こんにちは」「どんもー」といった string をハードコードして表示してしまっています。チャットで表示するメッセージは、このように固定のものではなく、可変でしょうから、外部から MessageList component にメッセージの配列を渡せるようにして、表示するメッセージを注入できるようにしたいです。定義された MessageList component は、arrow function を使って定義された関数なので、通常の関数同様、引数を渡すことができます。React component における引数は `props` と呼ばれ、props 経由で対象の component を描画している親 component から、任意の値を渡すことができます。

```tsx
// props から値を受け取る
const MyName = (props) => <div>私の名前は{props.myName}です</div>;

// props から値を注入する
const Parent = () => <MyName myName="吉田" />;
```

それでは、MessageList component に props を追加していきましょう。MessageList componnet の定義を次のように書き換えてください。

```tsx
import { FC } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

type Props = {
  messageList: string[];
};

const MessageList: FC<Props> = (props) => {
  return (
    <Stack>
      {props.messageList.map((message) => {
        return <Box>{message}</Box>;
      })}
    </Stack>
  );
};

export default MessageList;
```

string の配列を `messageList` という key で保持している `Props` という型を定義し、これを `FC` 型に　`FC<Props>` のような形で渡しています。TypeScript の型は型を引数としてとることができ、この場合の型引数のことを `generics` と呼びます。ここでは詳細は割愛しますが、`FC<Props>`　は `Props` という型の props を受け取る React Function Component の型を表現していると捉えてください。

```tsx
type Props = {
  messageList: string[];
};

const MessageList: FC<Props> = (props) => {

```

props として受け取った `messageList` は配列なので、これを 1 つずつ Box component で囲って表示できれば、props から受け取ったメッセージたちを全て表示することができそうです。
このような場合には、JavaScript の `array.prototype.map()` を利用することができます。`array.prototype.map()` は、呼び出し元の配列を元に、新しい配列を生成するメソッドで、これを用いて `messageList` の要素が `Box` component に wrap された新しい配列を生成して、これを描画しています。

```tsx
// messageList の要素が `Box` でwrap された新しい配列を生成し、表示する
<Stack>
  {props.messageList.map((message) => {
    return <Box>{message}</Box>;
  })}
</Stack>
```

ここまでで MessageList component が props を受け取るように実装を変更することができました。 `App.tsx` に戻って、 `messageList` props に適当な string の配列を渡してみましょう。

```tsx
import MessageList from './components/MessageList';

// TODO: ユーザーの入力によってmessageList が可変になるようになる
const messageList = ['こんにちは', 'テスト', 'ですです'];

function App() {
  return (
    <div>
      <MessageList messageList={messageList} />
    </div>
  );
}

export default App;
```

定義した配列の中の文字列が、1 つずつ表示されていれば、`messageList` を props 経由で受け取れるようにする改修は完了です。

![./images/props.png]

## まとめ

今回のチャプターでは、JavaScript / TypeScript における変数・関数の定義の方法に触れつつ、props を受け取ることのできる React component の作成を、MUI で UI を組み立てつつ行いました。
次のチャプターでは、実際にユーザーがキーボードで入力したテキストをメッセージとして表示できるように改修を行っていきます。
初めて触れる概念が多く登場したと思うので、参考資料を確認しつつ、キャッチアップをしていただければと思います。
お疲れさまでした！

## 参考資料

- [必要な情報を保存する — 変数 - ウェブ開発を学ぶ | MDN](https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Variables)
- [関数の型 - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/type-system/functions)
- [Type Assertion（型アサーション） - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/type-system/type-assertion)
- [型推論 - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/type-system/type-inference)
- [ジェネリック型 - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/type-system/generics)
- [export - JavaScript | MDN](https://developer.mozilla.org/ja/docs/web/javascript/reference/statements/export)
- [Array.prototype.map() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [コンポーネントと props – React](https://ja.reactjs.org/docs/components-and-props.html)
