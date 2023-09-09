import { signOut } from "firebase/auth";
import { authSess } from "../firebaseConfig";


export const signOutOfAccountFirebase = async () => {
    signOut(authSess).then(() => {
        //delete from cache and update context
        console.log("sign out successful")
      }).catch((error) => {
        // An error happened.

        throw new Error(error);
      }
    );

}
