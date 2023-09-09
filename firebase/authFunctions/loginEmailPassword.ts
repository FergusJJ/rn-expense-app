import { authSess } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FirebaseRegisterAuthResponse } from "../../types/types";

export default async function LoginExistingAccount(email: string, password: string):Promise<FirebaseRegisterAuthResponse>  {

    //idk what i change here to get the user value to be returned from my then block
    //
    let result = signInWithEmailAndPassword(authSess, email, password)
    .then((userCredential: UserCredential) => {
        const user = userCredential.user;
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
        const errorMessage = error.message
        const returnVal: FirebaseRegisterAuthResponse = {
            user:undefined,
            error:true,
            errorCode:errorCode,
            errorMessage:errorMessage
        };
        return returnVal;
    })
    return result

}