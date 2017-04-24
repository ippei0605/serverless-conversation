'use strict';
/**
 * Watson Conversation サービスの Send Message を呼び出し、結果を返す。
 * Watson Conversation の接続情報はアクションのパラメータに設定することでハードコードを避ける。
 * ・url: Conversation ワークスペースの URL
 * ・username: Conversation の username
 * ・password: Conversation の password
 *
 * main() will be invoked when you Run This Action
 * @param OpenWhisk actions accept a single parameter, which must be a JSON object.
 * @return The output of this action, which must be a JSON object.
 */
function main(params) {
    // モジュールを読み込む。
    const request = require('request');

    // オプションを定義する。
    const options = {
        "url": params.url,
        "method": "POST",
        "auth": {
            "username": params.username,
            "password": params.password
        },
        "timeout": 5000,
        "body": {
            "input": {
                "text": params.text
            },
            "context": params.context
        },
        "json": true,
        "headers": {
            "Content-Type": "application/json",
            "User-Agent": "OpenWhisk"
        }
    };

    // Send Message を同期呼び出しする。
    var promise = new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                console.log('http status code:', (response || {}).statusCode);
                console.log('error:', error);
                reject({
                    error: error,
                    response: response,
                    body: body
                });
            }
        });
    });

    // 結果を返す。
    return promise;
};