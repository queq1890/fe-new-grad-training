# 2.環境構築

本チャプターでは、以下の作業を行っていきます。

- Node.js 環境の構築
- `create-react-app` を使った React.js + TypeScript の環境構築

## Node.js 環境の構築

まずはじめに、Node.js を手元の PC にインストールしていきます。Node.js は、JavaScript の実行環境であり、JavaScript で書かれたツール・アプリケーションを実行するために必要になります。今回のチュートリアルで作成する React.js のアプリケーションは、ブラウザで動作するアプリケーションですが、その開発には Node.js を欠かすことができません。以下に Node.js をインストールする方法を 2 種類記載するので、どれか 1 つを選んで Node.js をインストールしてみましょう。

※どちらの方法でインストールしても、本チュートリアルは進行することができます。

### 1. Node.js を直接インストールする

Node.js 公式のダウンロードページから、Node.js のインストーラが配布されています。自分のマシン・OS に合わせたものを選択してダウンロードし、インストーラを実行して Node.js をインストールしましょう。
https://nodejs.org/ja/download/

ダウンロードページには、「LTS 版」「最新版」の 2 つのバージョンのインストーラが記載されています。「LTS」は`Long-Term Support` の略で、リリースから 2 年間のメンテナンスとサポートが宣言された安定バージョンです。 一方で、最新版は Node.js の最新の機能を使用できますが、バグが含まれていたり、意図した通りに動作しない可能性があります。 今回は、Node.js に初めて触れるユーザーを想定しているため、安定的に動作する「LTS 版」をインストールすることを推奨します。

※MacOS を利用している場合は、Homebrew から Node.js をインストールすることが可能です。

```bash
$ brew install node
```

### 2. Node.js のバージョン管理ツール経由で Node.js をインストールする

アプリケーションによっては、 `.node-version` のような Node.js のバージョンを指定する設定ファイルを配置して、アプリケーションを実行できる Node.js のバージョンを固定していることがあります。複数のバージョンの Node.js を実行する可能性をふまえ、Node.js のバージョンを簡単に切り替えられる、バージョン管理ツール経由で Node.js をインストールすることも選択肢の 1 つとして考えられます。

### Node.js がインストールできたかどうかの確認

Node.js がマシンにインストールされたかどうか確認するために、CLI 上でインストールされている Node.js の version を確認するコマンドを実行してみましょう。インストールできている場合、v16.15.0 のようなバージョン情報が表示されるはずです。

```bash
$ node -v
v16.15.0
```

併せて、Node.js のパッケージマネージャである npm も利用可能になっているかどうか確認しましょう。

```bash
$ npm -v
v8.3.0
```

## React.js + TypeScript 環境の構築

Node.js をインストールすることができたので、ここからは React.js + TypeScript アプリケーションのプロジェクト環境を作成していきます。

### create-react-app を npm 経由でインストールする

[create-react-app](https://github.com/facebook/create-react-app) は React.js の開発元である Facebook が React.js の開発を手軽に開始するために提供しているツールです。ゼロから React.js の環境を作る場合は、build ツールの config を記述したり、環境の構築に必要な package を自身で選定して npm からインストールしたりなど、Node.js / React.js の開発に慣れていないエンジニアにはあまり優しくないプロセスを要求されます。今回は build の config を行うことが目的ではないので、zero config で React.js の環境を作ることができる`create-react-app` を利用していきます。　 CLI 上で `npm install` を実行して、`create-react-app` をインストールしてください。

```bash
$ npm install -g create-react-app
```

`npm install` は本来コマンドを実行したリポジトリに指定した package をインストールし、`node_modules/`　と呼ばれるディレクトリにインストールされた package のコードを格納するのですが、 `-g` option を指定して実行することで、ディレクトリ問わずグローバルに指定した package をインストールすることができます。`create-react-app` はディレクトリを問わず実行したいライブラリなので、 `-g` オプションをつけて　`npm install` を実行しています。

※ `npm install` 時に指定できる他のオプションが気になる方は、`npm install -h` を実行して help を表示するか、[npm の公式ドキュメント](https://docs.npmjs.com/cli/v8/commands/npm-install) をご覧ください。

### create-react-app を使って React.js + TypeScript 環境のハローワールド

次に、`create-react-app` を使って React.js プロジェクトを作成していきます。以下のコマンドを CLI 　上で実行してください。

```bash
$ npx create-react-app my-app --template typescript
```

`--template` は create-react-app が提供しているテンプレートを指定して React.js アプリケーションを作成するオプションで、今回は JavaScript ではなく TypeScript を使った環境を作成したいため、 `--template typescript` のような記述を追加してコマンドを実行しています。　`my-app` は作成する React.js アプリケーションの名前になるので、適宜好きなものに変更して実行していただいても構いません。

上記コマンドが完了したら、　`create-react-app` が作成されたディレクトリに移動して、`package.json` を確認してみましょう。

```bash
# CLI 上 or 任意のエディタで作成されたディレクトリを開いてpackage.json を確認する
$ cd my-app
$ cat package.json
```

```json
{
  "name": "app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.2.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.0",
    "@types/node": "^16.11.33",
    "@types/react": "^18.0.9",
    "@types/react-dom": "^18.0.3",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.6.4",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

`dependencies` セクションに、`create-react-app` がディレクトリ生成時に自動で install された npm パッケージが記載されています。React.js アプリケーションの諸々の config を肩代わりしているのは`react-scripts` というパッケージで、内部的に Webpack の config 用の script などが含まれています。

`scripts` セクションに、このアプリケーションのディレクトリ配下で実行可能な script が記載されています。開発環境向けに、React.js の dev server を起動する script は `start` です。CLI から実行してみましょう。　（初回起動時は build に時間が掛かる可能性があります）

```bash
npm run start
```

![./images/hello-world.png]

## まとめ

本チャプターでは、Node.js の環境構築と、`create-react-app` を使った React.js + TypeScript プロジェクトの作成を行いました。次のチャプターから、React.js を使った Web フロントエンドアプリケーションの実装を行っていきます。
お疲れさまでした！ 🍵

## チャレンジ

1. `create-react-app` によって生成されたディレクトリには、`package.json` の他に、`package-lock.json` という json ファイルも生成されています。この json ファイルには、どのような役割があるか、調べてみましょう。

## 参考資料

-
