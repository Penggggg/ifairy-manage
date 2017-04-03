

/**类别  */
export interface ISclassify {
    classifyTitle: string
    keyCode: string
    children: Array<{
        classifyName: string
        keyCode: string
    }>
    meta?: {
        createdTime: string,
        updatedTime: string
    }
}