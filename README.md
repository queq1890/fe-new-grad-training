# fe-new-grad-training

## このリポジトリについて

React.js + TypeScript に初めて触れる方向けのチュートリアルリポジトリです。

### チュートリアルの想定受講対象

- 他のプログラミング言語を触ったことがあるが、Web フロントエンドに関係する技術を触ったことがない

### チュートリアルのゴール

- JavaScript / TypeScript / React.js について、ライブラリのチュートリアル・Udemy の講座などを通して、自習を行えるレベル

## リポジトリの構成

- [app](./app): このチュートリアルで作成する React.js アプリケーションの実装サンプル
- [lessons](./lessons): チュートリアルのマークダウンファイルが格納されているディレクトリ
- [appendix](./appendix): チュートリアル完了者向けの補足が格納されているディレクトリ

## チュートリアルの構成

5 つのチャプターで構成されています。

### [01. 現代 Web フロントエンドの特徴](./lessons/01-background/lesson.md)

- 最近の Web フロントエンド(2022/05 時点)での Web フロントエンドについて、どのような技術が、どのような背景で採用されているかの解説

### [02. 環境構築](./lessons/02-getting-started/lesson.md)

- Node.js 環境の構築
- React.js + TypeScript 環境の構築

### [03. マークアップをしてみよう](./lessons/03-markup/lesson.md)

- JavaScript / TypeScript での変数・関数宣言
- 不要なコード・ファイルの削除
- UI ライブラリの導入
- React component の作成
- TypeScript を使った function の定義

### [04. React component に状態を持たせてみよう](./lessons/04-state/lesson.md)

- `useState` hook を使った状態管理
- React の SyntheticEvent
- ユーザーがメッセージを入力できる component の作成
- 入力された内容を messageList に追加するロジックの実装

### [05. API から data を fetch してみよう](./lessons/05-fetch-data/lesson.md)

- MessageArea component のリファクタリング
- Profile component の作成
- GitHub Users API から data を fetch する

## 進め方

- `lessons/**/lesson.md` をチャプター順に読んでください。
  - 各チャプターの末尾に、チャレンジが記載されている場合があります。
    - 「〇〇とはどういう意味か調べてみてください」「XX を実装してみてください」といった内容のチャレンジが記載されています。
    - どうしても分からない場合は、`app/` 以下の実装を参考にしてみたり、受講者通りで相談したり、松本まで質問をしたりしてみてください。

## コントリビューション

- PR / Issue は大歓迎です 🍺
- 誤字・コードの修正など、訂正したい点が見つかった場合は、PR を open して[@queq1890](https://github.com/queq1890) を reviewer に設定してください。
- 議論が必要なトピックについては、Issue を作成してください。
