"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isDevelopment = process.env.NODE_ENV === 'development' ? true : false;
exports.AppConfig = {
    nodePort: isDevelopment ? 3001 : 80,
    reqUrl: isDevelopment ? 'localhost:3000' : '',
    dbTarget: isDevelopment ? 'ifairyDev' : 'ifairyPro',
    dbIp: 'mongodb://127.0.0.1'
};
