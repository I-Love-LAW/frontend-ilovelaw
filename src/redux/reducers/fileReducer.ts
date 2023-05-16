import { CustomAction } from "../actions/generalAction"
import { ActionType } from "../actions/actionType"
import { FileModel } from "../../components/auth"

export interface FileState {
    isOrchestra?: boolean
    fileInput?: File[]
    imageFormat?: string
    singleOrMultiple?: string
    colorType?: string
    dpi?: string
    username?: string
}

export const initialState: FileState = {
    isOrchestra: undefined,
    fileInput: undefined,
    imageFormat: undefined,
    singleOrMultiple: undefined,
    colorType: undefined,
    dpi: undefined,
    username: undefined
}

interface FileAction extends CustomAction {
    setFile?: FileModel
}

let isOrchestra: boolean | undefined
let fileInput: File[] | undefined
let imageFormat: string | undefined
let singleOrMultiple: string | undefined
let colorType: string | undefined
let dpi: string | undefined
let username: string | undefined

const fileReducer = (state = initialState, action: FileAction) => {
    switch (action.type) {
        case ActionType.SET_FILE_CONVERT:
            if (!action.setFile) return state
            isOrchestra = action.setFile.isOrchestra ? action.setFile.isOrchestra : undefined;
            fileInput = action.setFile.fileInput ? action.setFile.fileInput : undefined;
            imageFormat = action.setFile.imageFormat ? action.setFile.imageFormat : undefined;
            singleOrMultiple = action.setFile.singleOrMultiple ? action.setFile.singleOrMultiple : undefined;
            colorType = action.setFile.colorType ? action.setFile.colorType : undefined;
            dpi = action.setFile.dpi ? action.setFile.dpi : undefined;
            username = action.setFile.username ? action.setFile.username : undefined;
            return {
                ...state,
                isOrchestra,
                fileInput,
                imageFormat,
                singleOrMultiple,
                colorType,
                dpi,
                username
            }
        case ActionType.REMOVE_FILE_CONVERT:
            return {
                ...state,
                isOrchestra: undefined,
                fileInput: undefined,
                imageFormat: undefined,
                singleOrMultiple: undefined,
                colorType: undefined,
                dpi: undefined,
                username: undefined
            }
        default:
            return state
    }
}

export default fileReducer