# udonarium-backend-vercel

`udonarium-backend-vercel` は、ユドナリウム（`Udonarium`）のバックエンド処理を行うアプリケーションの`Vercel`実装です。

## なにこれ？

- [Udonarium-Backend](https://github.com/TK11235/udonarium-backend) の [Vercel](https://vercel.com/home) 版
- 本家に Vercel サポートの PR を作ろうと思ったが、monorepo 構成でプロジェクトルートにツールをインストールさせる PR 出すのもアレだったので Fork したもの

## ひつよう

1. [Node.js](https://nodejs.org/en/) ※LTS を推奨
2. [Vercel](https://vercel.com/home) のアカウント
3. GitHub or BitBucket or GitLab のアカウント
4. SkyWay のアカウント
5. 根気。

## どうやって使うの？

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSavageChieftain%2Fudonarium-backend-vercel&SKYWAY_APP_ID,SKYWAY_SECRET,ACCESS_CONTROL_ALLOW_ORIGIN&project-name=my-udonarium-backend-vercel&repository-name=my-udonarium-backend-vercel)

1. 上記のボタンをクリック
2. 画面の指示に従ってアプリを作成

### 注意

環境変数は必ず設定してください。

- `SKYWAY_APP_ID`: SkyWay から発行されたアプリケーション ID
- `SKYWAY_SECRET`: SkyWay から発行されたシークレットキー
- `ACCESS_CONTROL_ALLOW_ORIGIN`： ユドナリウムのフロントアプリを設置した URL。この場所以外からのリクエストは拒否されます。

### License

- [MIT License](./LICENSE)
