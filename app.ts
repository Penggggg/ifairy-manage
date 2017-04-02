import * as Koa from 'koa';
import * as path from 'path';
import * as KoaRouter from 'koa-router';
import * as KoaLog from 'koa-logs-full';
import * as KoaServer from "koa-static2";
import * as KoaBodyParser from 'koa-bodyparser';

import setRouter from './controller';
import { AppConfig } from './config/app.config';

const app = new Koa( );
const router = new KoaRouter( );


setRouter( router )

app
  .use(KoaLog( app,{
      logdir: path.join( __dirname, 'logs')
  }))
  .use(KoaServer("static", __dirname + '/dist'))
  .use(KoaBodyParser( ))
  .use(router.routes( ))
  .use(router.allowedMethods( ));

app.listen( AppConfig.nodePort );
console.log(`app is running in ${AppConfig.nodePort}`);
console.log(`app's env is ${process.env.NODE_ENV}`)