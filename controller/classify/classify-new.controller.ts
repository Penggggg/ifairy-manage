import * as Koa from 'koa';
import * as Request from 'superagent';
import { AppConfig } from '../../config/app.config';

import { _IPostClassifyNew, __IPostClassifyNew, IPostClassifyNew_ } from '../../interface/api.interface';

/**类别-新增 */
export let classifyNew = async( ctx: Koa.Context ) => {

    let { classifyTitle, children } = ctx.request.body as _IPostClassifyNew;
    
    /**获取数据库 类别表 长度 */
    let allClassify = await Request.get(`${AppConfig.reqUrl}/mapi/v1/classify-all`)
    let allClassifyLength = allClassify.body.length;

    /**查询是否已存在 */
    let classifyHasExist = await Request
        .get(`${AppConfig.reqUrl}/mapi/v1/classify-exist`)
        .query({ classifyTitle })

    if ( classifyHasExist.body ) {
        return ctx.body = {
            msg: 'classifyHasExisted',
            status: '400'
        } as IPostClassifyNew_
    }

    /**初始化空对象 */
    let metaData: __IPostClassifyNew = { 
        classifyTitle: '',
        keyCode: '',
        children: [ ]
    };
    
    /**赋值 */
    metaData.classifyTitle = classifyTitle;
    metaData.keyCode = transformKeyCode( allClassifyLength );

    /**数据预处理 */
    let decoratedChildren = children.map(( child ) => ({
        imgURL: child.imgURL,
        classifyName: child.classifyName,
        classifyInfo: child.classifyInfo,
        keyCode: transformKeyCode( child.key )
    }))

    metaData.children = decoratedChildren;


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
    ctx.body = result.text || {
        msg: 'error',
        status: '500'
    } as IPostClassifyNew_


}

/** 2 返回 0002， 10返回0010 */
function transformKeyCode( length: number | string ) {
    let base = ['0', '0', '0', '0'];
    base.push(String( length ));
    for( let i = 0; i < length.toString( ).length; i++ ) {
        base.shift( );
    }
    return base.join('');
}