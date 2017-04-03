import * as fs from 'fs';
import { classifyNew } from './classify/classify-new.controller';

export default ( router ) => {

    /**首页 */
    router.get('/', getIndex );

    /**分类-新增 */
    router.post('/mapi/v1/classify-new', classifyNew )

}

async function getIndex( ctx ) {
    let a = fs.readFileSync('./dist/index.html', 'utf8');
    ctx.body = a;
}