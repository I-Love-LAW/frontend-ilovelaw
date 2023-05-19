import {
  ReactNode,
  FC,
  createContext,
  useContext,
} from 'react'
import {FileModel} from '../../core/_models'
import * as fileHelper from '../../core/Helpers'
import { useSelector } from 'react-redux'
import { rootState } from '../../../redux/reducers/rootReducer'
import {FileState} from "../../../redux/reducers/fileReducer";

type WithChildren = {
  children?: ReactNode
}

type FileContextProps = {
  file: FileState | undefined,
  saveFile: (auth: FileModel | undefined) => void,
  deleteFile: () => void
}

const initFileContextPropsState = {
  file: undefined,
  saveFile: () => {},
  deleteFile: () => {},
}

const FileContext = createContext<FileContextProps>(initFileContextPropsState)

const useFile = () => {
  return useContext(FileContext)
}

const FileProvider: FC<WithChildren> = ({children}) => {
  const file = useSelector((state: rootState) => state.file)
  const saveFile = (file: FileModel | undefined) => {
    if (file) {
      fileHelper.setFile(file)
    } else {
      fileHelper.removeFile()
    }
  }
  const deleteFile = () => {
    saveFile(undefined)
  }

  // @ts-ignore
  return (
    <FileContext.Provider value={{file, saveFile, deleteFile}}>
      {children}
    </FileContext.Provider>
  )
}

export {FileProvider, useFile}
