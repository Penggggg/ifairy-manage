import * as Koa from 'koa';
import * as Request from 'superagent';
import { AppConfig } from '../../config/app.config';

import { _IPostClassifyNew, __IPostClassifyNew } from '../../interface/api.interface';

/**类别-新增 */
export let classifyNew = async( ctx: Koa.Context ) => {

    let { classifyTitle } = ctx.request.body as _IPostClassifyNew;
    
    /**获取数据库 类别表 长度 */
    let allClassify = await Request.get(`${AppConfig.reqUrl}/mapi/v1/classify-all`)
    let allClassifyLength = allClassify.body.length;

    /**初始化空对象 */
    let metaData: __IPostClassifyNew = { 
        classifyTitle: '',
        keyCode: '',
        children: [ ]
    };
    
    /**赋值 */
    metaData.classifyTitle = classifyTitle;
    metaData.keyCode = transformKeyCode( allClassifyLength );

    let classifyChildren = ctx.request.body;
    delete classifyChildren['classifyTitle']
    let children = Object.keys( classifyChildren ).map(( key ) => ({
        classifyName: ctx.request.body[`${key}`],
        keyCode: transformKeyCode(Number( key ))
    }))

    metaData.children = children;


    console.log( metaData )
    /**请求转发 */
    let result = await Request
        .post(`${AppConfig.reqUrl}/mapi/v1/classify-new`)
        .send({
            classifyTitle: metaData.classifyTitle,
            keyCode: metaData.keyCode,
            children: metaData.children
         } as __IPostClassifyNew)

    /**返回数据 */
    ctx.body = result.text;


}

/** 2 返回 0002， 10返回0010 */
function transformKeyCode( length: number ) {
    let base = ['0', '0', '0', '0'];
    base.push(String( length ));
    for( let i = 0; i < length.toString( ).length; i++ ) {
        base.shift( );
    }
    return base.join('');
}