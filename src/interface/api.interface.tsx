import { IClassifyNew } from './form.interface';

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