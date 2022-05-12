# Appendix-01. アプリケーション改善のアイディア

チュートリアルで作成したアプリケーションは、とりあえず React.js と TypeScript の素振りを行うためのもので、完成したものは「アプリケーション」と呼ぶには色々欠けている部分があります。本稿では、追加で学習したい方のために、作成した React.js アプリケーションに実施できそうな改善のアイディアを羅列しておきます。

## ルーティング

作成したアプリケーションは全て http://localhost:3000 直下で動作するものでした。ですが、実際の Web サイトには、`/` `/mypage` `/faq` など、様々な URL のページが存在しています。
React.js では `router` と呼ばれる種類のライブラリを使って、ページの URL によって表示するコンポーネントを切り替える実装がよく行われます。どのようなライブラリがあるかを調べ、実装してみましょう。

## prettier の導入

create-react-app によって作成された React.js アプリケーションには、linter (ESLint) は導入されていましたが、formatter (prettier) は導入されていません。
https://create-react-app.dev/docs/setting-up-your-editor/#formatting-code-automatically を参考に、prettier を導入してみましょう。

## UI をきちんと組み立てる

作成したアプリケーションは、MUI のコンポーネントをただ並べているだけでした。実際のチャット UI っぽくなるように、マークアップを変更してみましょう。他には、ダークモードを実装してみても面白いかもしれません。

## デプロイをしてみる

作成したアプリケーションをデプロイしてみましょう。無料の hosting サービスとしては、[Netlify](https://www.netlify.com/)・[Vercel](https://vercel.com/) が広く利用されています。

[<< 前のチャプター](../../lessons/04-state/lesson.md) | [付録 2 >>](../02-self-taught-resources/appendix.md)
