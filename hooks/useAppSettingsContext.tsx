import { useContext } from "react"
import { AppSettingsContext } from "../components/contexts/AppSettingsContext"

export const useAppSettingsContext = () => {
    const context = useContext(AppSettingsContext);
    if (context === undefined) {
        throw new Error("useUserContext was used outside of its Provider");
    }
    return context
}