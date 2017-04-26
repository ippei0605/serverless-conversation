'use strict';
/**
 * CLI テストドライバー
 */

//TODO: {url} をご自身の API の URL に変更してください。wsk api-experimental list コマンドで URL を参照できます。
const url = '{url}';

const request = require("request");
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const prefix = '> ';

let context = null;

// Chat
let chat = (text) => {
    let options = {
        "method": "POST",
        "url": url,
        "headers": {
            "accept": "application/json",
            "content-type": "application/json",
        },
        "json": true,
        "body": {
            "text": text,
            "context": context
        }
    };
    request(options, (error, response, body) => {
        if (error) {
            console.log('error: ', error);
        }
        context = body.context;
        console.log(body.output.text);
        rl.setPrompt(prefix, prefix.length);
        rl.prompt();
    });
};

// Read Line
rl.on('line', line => {
    // 2回目以降の Watson の応答
    chat(line);
}).on('close', () => {
    console.log('テストドライバーを終了します。お疲れ様でした。');
    process.exit(0);
});

// 処理開始
console.log(prefix + 'テストドライバーを開始します。Watson に質問してください。');
// 初回の Watson の応答
chat('');
