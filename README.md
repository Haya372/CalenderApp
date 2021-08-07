# Express×ReactのWebpack環境
## 起動コマンド
| コマンド | |
| -- | -- |
| dev | フロントエンドのweppack-dev-server起動 |
| start | expressサーバー起動 |
| build | フロントエンドのコードをビルド |

※ 本番用のサーバー起動コマンドは別で作る必要がある  
## ngrokについて
- Invalid Host headerというエラーが出るため下記のコマンドで実行する
```
ngrok http 30001 -host-header="localhost:30001"
```
## 参考
https://qiita.com/ohs30359-nobuhara/items/bdc06b2db1bef7af2439