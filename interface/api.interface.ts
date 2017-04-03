
/**分类-新增 */
export interface _IPostClassifyNew {
    classifyTitle: string
    [ key: string ]: string
}

export interface IPostClassifyNew_ {
    msg: 'success' | 'error' | 'classifyHasExisted'
    status: '200' | '500' | '400'
}

export interface __IPostClassifyNew {
    classifyTitle: string
    keyCode: string
    children: Array<{
        classifyName: string
        keyCode: string
    }> | string
}