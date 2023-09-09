import { db }from "../firebaseConfig";
import { collection, addDoc, Timestamp, setDoc, doc, getDoc, DocumentData } from "firebase/firestore";



export const addNewUserToFirestore = async (
    uid: string, firstName: string, lastName: string, membership:string
    ) => {
    try {
        await setDoc(doc(db, "users", uid), {
            firstName:firstName,
            lastName:lastName,
            createdAt:Timestamp.now(),
            membership:"basic"
        }).then((val) => {
        console.log(`User document for uid:${uid}\n${val}`);
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getUserFromFirestore = async (
    uid: string, displayName: string
): Promise<boolean> => {
    try {
        await getDoc(doc(db, "users", uid)).then((val: DocumentData)  =>  {
            if (val._document === null) {
                console.log("uid not present in firestore, adding...")
                const [fname, lname] = displayName.split(" ", 2);
                addNewUserToFirestore(uid, fname, lname, "basic")
            }
        })
    } catch (e) {
        console.error(`Error fetching user with uid: "${uid}" from firestore\n`, e);
        return false;
    }
    return true;
}