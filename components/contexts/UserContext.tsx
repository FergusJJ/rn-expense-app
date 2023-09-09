import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext, useState, useEffect} from "react";
import { UserContextStruct } from "../../types/types";

const defaultVal: UserContextStruct = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    auth: null,
    setAuth: () => {}
};

type CtxProps = {
    children: JSX.Element
}

const UserContext = createContext(defaultVal);

const UserContextProvider:React.FC<CtxProps> = (props) => {
    const [auth, setAuth] = useState<null | string>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    //will run when login state changes
    useEffect(() => {
        const fetchAuthFromStorage = () => { 
            AsyncStorage.getItem("auth")
            .then((value) => {
                    setAuth(value);
                })
            .catch((err) => {
                console.log(err)
            });
        }
        fetchAuthFromStorage();
    }, []);
    return (
        <UserContext.Provider value={{auth,setAuth, isLoggedIn, setIsLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}
