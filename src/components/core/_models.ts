export interface AuthModel {
    access?: string,
    refresh?: string,
    username?: string,
    roles?: string[]
}

export interface FileModel {
    isOrchestra?: boolean,
    fileInput?: File[],
    imageFormat?: string,
    singleOrMultiple?: string,
    colorType?: string,
    dpi?: string,
    username?: string,
}