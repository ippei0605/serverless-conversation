# Serverless Conversation

## はじめに
サーバーレスが注目されているですので、Bluemix の OpenWhisk でサーバーレスアプリケーションを作成しました。

「さわってみようWatson on Bluemix」(IBM) の Natural Language Classifier と Dialog による会話の仕組みを Conversation に移植しました。

## モジュール関連図
![関連図](docs/figure.png)


* Node-RED から Node.js に移植しました。
* Dialog の廃止に伴い、当該機能を削除しました。
* 質問 (テキスト) 以外にローカルの日時をサーバに送信、general-hello クラスの「おはよう」(5〜11時)、「こんにちは」(11〜17時)、「こんばんは」(17時〜24時)、「お疲れ様です」(0〜5時) の出し分けを追加しました。
* Text to Speech によるテキストの読上げ機能を追加しました。(PC の Chrome、Firefox に対応)  
* Google Speech API による音声認識機能を追加しました。(PC の Chrome に対応)  
* 管理機能を追加しました。
    - コンテンツ参照
    - トレーニングデータ抽出
    - Natural Language Classifier 操作用GUI