import React, {createContext, useState, useEffect} from "react";
import { ExpenseCategoryStruct, UserDataContextStruct } from "../../types/types";
import { fetchUserCategories } from "../../firebase/firestore/Categories";
const defaultVal: UserDataContextStruct = {
    savedCategories:  [],
    setSavedCategories: () => {},
    uid: "",
    setUid: () => {},
}

type CtxProps = {
    children:JSX.Element,
    uidProp: string
}

const UserDataContext = createContext(defaultVal);

const UserDataContextProvider: React.FC<CtxProps> = ({children, uidProp}) => {
//useState<Array<[ExpenseItemData, number]>>([]);
    const [savedCategories, setSavedCategories] = useState<Array<[string, ExpenseCategoryStruct]>>([]);
    const [uid, setUid] = useState<string>("");

    useEffect(() => {
        //i think only want to fetch from firestore, since should be independent of the device,
        setUid(uidProp);
        fetchUserCategories(uidProp).then((val:Array<[string,ExpenseCategoryStruct]>) => {
            // console.log(val)
            //i think it is not showing immediately because setstate async
            setSavedCategories([...savedCategories, ...val]);
            console.log("userDataContextProvider ran, saved categories: ",savedCategories)
        });

    }, []);


    return (
        <UserDataContext.Provider value={{savedCategories,setSavedCategories, uid, setUid}}>
            {children}
        </UserDataContext.Provider>
    )
}

export {UserDataContext, UserDataContextProvider}