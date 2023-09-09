import { FirebaseNameResponse } from "../../types/types";
import { updateProfile, User } from "firebase/auth";


export default async function updateAccountName(user: User, name: string): Promise<FirebaseNameResponse> {
    let result = updateProfile(user, {displayName:name}).then(()=>{
        const returnVal: FirebaseNameResponse =  {
            error:false,
            errorCode:undefined,
            errorMessage:undefined,
        }
        return returnVal;
    }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        const returnVal: FirebaseNameResponse = {
            error:true,
            errorCode:errorCode,
            errorMessage:errorMessage,
        }
        return returnVal;
    });

    return result

}