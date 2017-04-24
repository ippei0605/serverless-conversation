'use strict';
/**
 * CLI テストドライバー
 */

const request = require("request");

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const prefix = '> ';

let context = null;

// Chat
let chat = (text) => {
    let options = {
        "method": "POST",
        "url": "https://de48b05f-e3b7-468b-9376-71fae6816b02-gws.api-gw.mybluemix.net/api/chat",
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
