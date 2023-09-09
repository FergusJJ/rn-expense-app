import {FirebaseRegisterAuthResponse, FirebaseNameResponse } from "../../types/types";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { authSess } from "../firebaseConfig";
import deleteAccount from "./deleteAccount";
import { addNewUserToFirestore } from "../firestore/AddUser";

export default async function SignUpAccount(email: string, password: string, fname: string, lname: string):Promise<FirebaseRegisterAuthResponse> {
    let name = `${fname} ${lname}`;

    try {
        const result = await createUserWithEmailAndPassword(authSess, email, password)
        .then((response) => {
            const user = response.user;
            const returnVal: FirebaseRegisterAuthResponse = {
                user:user,
                error:false,
                errorCode:undefined,
                errorMessage:undefined
            };
            return returnVal;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const returnVal: FirebaseRegisterAuthResponse = {
                user:undefined,
                error:true,
                errorCode:errorCode,
                errorMessage:errorMessage
            };
            return returnVal
        });
        if (result.user === undefined) {
            return result;
        };

        const profileResult: FirebaseNameResponse = await updateProfile(result.user, {
            displayName:name
        })
        .then(() => {
            //need to refetch user here i think
            const returnVal: FirebaseNameResponse =  {
                error:false,
                errorCode:undefined,
                errorMessage:undefined,
            };  
            if (result.user?.uid !== undefined) {
                addNewUserToFirestore(result.user?.uid, fname, lname, "basic");
                console.log("added to firebase")
            } else {
                console.log("couldn't add to db")
            }
            return returnVal;
        })
        .catch((error) => {
            console.log("in error")
            const errorCode = error.code;
            const errorMessage = error.message;
            const returnVal: FirebaseNameResponse = {
                error:true,
                errorCode:errorCode,
                errorMessage:errorMessage,
            }
            return returnVal;
        })
        if (profileResult.error) {
            //delete account and return the name error code
            await deleteAccount();
            const errorCode = profileResult.errorCode;
            const errorMessage = profileResult.errorMessage;
            const returnVal: FirebaseRegisterAuthResponse = {
                user:undefined,
                error:true,
                errorCode:errorCode,
                errorMessage:errorMessage
            };
            return returnVal;
        }
        
        return result;

    } catch (error) {
        console.log(error);
        const returnVal: FirebaseRegisterAuthResponse = {
            user:undefined,
            error:true,
            errorCode:`${error}`,
            errorMessage:`${error}`
        };
        return returnVal
    }
}