import { deleteUser, User } from "firebase/auth";
import { authSess } from "../firebaseConfig";

export default async function deleteAccount() {

    const user = authSess.currentUser;
    await deleteUser(user as User)
    .catch((error) => {
        console.log(error)
    });

}