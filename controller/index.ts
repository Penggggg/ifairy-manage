import * as fs from 'fs';

export default ( router ) => {

    /**首页 */
    router.get('/', getIndex )

}

async function getIndex( ctx ) {
    let a = fs.readFileSync('./dist/index.html', 'utf8');
    ctx.body = a;
}