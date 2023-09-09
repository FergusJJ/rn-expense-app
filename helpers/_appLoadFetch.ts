import AsyncStorage from "@react-native-async-storage/async-storage";
import { Currencies, Themes } from "../types/types";

//not currently needed, might have to group all the appload functioons such as fetching auth and preferences here at some point tho
export const fetchThemeFromStorage = async () => {
    return AsyncStorage.getItem("THEME")
    .then((value) => {
        if (value === `"LIGHT"`) {
            return Themes.LIGHT;
        };
        if (value === `"DARK"`) {
            return Themes.DARK;
        };
        return Themes.EMPTY;
        // };
        
        })
    .catch((err) => {
        console.log(err);
        return Themes.LIGHT;
    });
};

export const fetchCurrencyFromStorage = async () => { 
    return AsyncStorage.getItem("CURRENCY")
    .then((value) => {
        if (value === `"empty"`) {   
            return Currencies.EMPTY;
        };
        return Currencies.GBP;
    })
    .catch((err) => {
        console.log(err);
        return Currencies.GBP;
    });
};
export const fetchNotificationsFromStorage = async () => { 
    return AsyncStorage.getItem("NOTIFICATIONS")
    .then((value) => {
        
        if (value === "true") {
            return true;
        };
        if (value === "false") {
            return false;
        };
        if (value === `"empty"`) {
            return null
        }
        })
    .catch((err) => {
        console.log(err);
        return false;
    });
};