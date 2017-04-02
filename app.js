"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var path = require("path");
var KoaRouter = require("koa-router");
var KoaLog = require("koa-logs-full");
var KoaServer = require("koa-static2");
var KoaBodyParser = require("koa-bodyparser");
var controller_1 = require("./controller");
var app_config_1 = require("./config/app.config");
var app = new Koa();
var router = new KoaRouter();
controller_1.default(router);
app
    .use(KoaLog(app, {
    logdir: path.join(__dirname, 'logs')
}))
    .use(KoaServer("static", __dirname + '/dist'))
    .use(KoaBodyParser())
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(app_config_1.AppConfig.nodePort);
console.log("app is running in " + app_config_1.AppConfig.nodePort);
console.log("app's env is " + process.env.NODE_ENV);
