import { useContext } from "react"
import {  UserDataContext } from "../components/contexts/UserDataContext"

export const useUserDataContext = () => {
    const context = useContext(UserDataContext);
    if (context === undefined) {
        throw new Error("useUserDataContext was used outside of it's provider");
    };
    return context;
}