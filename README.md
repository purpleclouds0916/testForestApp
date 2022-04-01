※本番環境へのデプロイ方法(rootディレクトリから)

1 yarn build 

このコマンドで本番環境へのデプロイの準備がされる。
もし、コードを修正した場合も、このコマンドで修正が反映される。

2 cd server 

3 node index.js

林分密度管理図のファイル

src/data/StandDensityData.json

に記載。これに追加することで、林分密度管理図のデータを追加することが可能

開発環境でのデプロイ方法

1 yarn start

src/index.tsxから他のファイルをたどっていく事ができます。

