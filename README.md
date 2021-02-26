# 猪苗代銀行



## 動かし方

### 1.準備
データベースにfirebase firestoreを使っています。

そのため、ローカルで動かすためにはfirestoreがあるfirebaseプロジェクトが必要です。
https://console.firebase.google.com/

(firestoreのエミュレータをローカルで動かすという方法もあるが、環境構築が若干手間なのでやっていない。)

firebaseプロジェクトは、以下の方法で設定が可能です。

このディレクトリに```.env.local```というファイルを作り、内容を以下のようにする。
```.env.local
FIREBASE_PROJECT_ID="xxx"
FIREBASE_CLIENT_EMAIL="xxx.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="xxx"
```
あとは以下の通りコマンドを実行すれば動作するはずです。

### 2.実行

```bash
npm install
npm run dev
```