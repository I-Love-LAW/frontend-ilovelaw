import {FileModel} from "../../components/core/_models";
import {ActionType} from "./actionType";

export function setFileAction(payload: FileModel) {
    return {
        type: ActionType.SET_FILE_CONVERT,
        setFile: payload
    }
}

export function removeFileAction() {
    return {
        type: ActionType.REMOVE_FILE_CONVERT,
    }
}