import {
    FC,
    createContext,
    useContext,
    useEffect,
    SetStateAction,
    Dispatch,
} from 'react'

const MetronicSplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
    undefined
)
const LayoutSplashScreen: FC<{visible?: boolean}> = ({visible = true}) => {
    // Everything are ready - remove splashscreen
    const setCount = useContext(MetronicSplashScreenContext)

    useEffect(() => {
        if (!visible) {
            return
        }

        if (setCount) {
            setCount((prev) => {
                return prev + 1
            })
        }

        return () => {
            if (setCount) {
                setCount((prev) => {
                    return prev - 1
                })
            }
        }
    }, [setCount, visible])

    return null
}

export {LayoutSplashScreen}