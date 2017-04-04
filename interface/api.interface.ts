
/**分类-新增 */
export interface _IPostClassifyNew {
    classifyTitle: string
    children: Array<{
         [ key in keyof IClassifyNew | 'key' ]: string 
    }>
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
        classifyInfo: string
        keyCode: string
        imgURL: string
    }> | string
}


interface IClassifyNew {
    classifyName: string
    classifyInfo: string
    imgURL: string
}