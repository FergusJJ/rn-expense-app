import { fetchCurrencyFromStorage, fetchThemeFromStorage, fetchNotificationsFromStorage } from "../../helpers/_appLoadFetch";
import React, {createContext, useState, useEffect} from "react";
import { AppSettingsContextStruct, Currencies, Themes } from "../../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultVal: AppSettingsContextStruct = {
    theme: Themes.EMPTY,
    setTheme: () => {},
    currency: Currencies.GBP,
    setCurrency: () => {},
    notifications: false, 
    setNotifications: () => {},
}

type CtxProps = {
    children: JSX.Element
}

const AppSettingsContext = createContext(defaultVal);

const AppSettingsContextProvider:React.FC<CtxProps> = (props) => {

    //fetched theme from storage should be used in the useState, idk why i can't just use LIGHT, then update
    const [theme, setTheme] = useState<Themes>(Themes.EMPTY);
    const [currency, setCurrency] = useState<Currencies>(Currencies.GBP);
    const [notifications, setNotifications] = useState<boolean>(false);

    useEffect(() => {
        //fetch from asyncStorage
        ;
        
        const asyncWrap = async () => {
            const storageTheme = await fetchThemeFromStorage();
            const storageNotifications = await fetchNotificationsFromStorage();
            const storageCurrency = await fetchCurrencyFromStorage();
            const storedSettings = {
                theme: storageTheme,
                notifications: storageNotifications,
                currency: storageCurrency
            }
            return storedSettings;
        }
        asyncWrap().then((value) => {
            if (value.theme === Themes.EMPTY) {
                setTheme(Themes.LIGHT);
            } else {
                setTheme(value.theme);
            }
            if (value.notifications === null) {
                setNotifications(false); // would want to trigger something to get the user's preference
            };
            if (value.currency === JSON.stringify(Currencies.EMPTY)) {
                setCurrency(Currencies.GBP);
            }
        })

    }, []);
    //this is out of sync with the value in the stored value
    //theme is fetched from storage but this is already running and hasn't got the new state for theme, so it uses the empty value
    useEffect(() => {
        // console.log("THEME UPDATING IN STORAGE");
        // if (theme === Themes.EMPTY) return;
        AsyncStorage.setItem("THEME", JSON.stringify(theme)).then(() => {
                console.log(" > ASYNC STORAGE UPDATED THEME ->", theme)
            });
    },[theme]);

    useEffect(() => {
        AsyncStorage.setItem("CURRENCY", JSON.stringify(theme)).then(() => {
                console.log(" > ASYNC STORAGE UPDATED CURRENCY ->", currency)
            });
    },[currency]);

    useEffect(() => {
        AsyncStorage.setItem("NOTIFICATIONS", JSON.stringify(theme)).then(() => {
                console.log(" > ASYNC STORAGE UPDATED NOTIFICATIONS ->", notifications)
            });
    },[notifications]);



    return (
        <AppSettingsContext.Provider value={{theme,setTheme,currency,setCurrency,notifications,setNotifications}}>
            {props.children}
        </AppSettingsContext.Provider>
    )
}

export {AppSettingsContext, AppSettingsContextProvider}