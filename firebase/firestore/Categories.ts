//Will contain the functions regarding saving new, deleting and fetching saved categories
import { db }from "../firebaseConfig";
import { collection, addDoc, Timestamp, setDoc, doc, getDocs, DocumentReference } from "firebase/firestore";
import {ExpenseCategoryStruct, FirebaseSaveCategoryResponse} from "../../types/types"

//want categories to be listed under the user id.
//within each category could have a transaction id? 
//then could store all of the users transactions in a seperate collection
//the transactions collection would store the information about the transaction
//the transaction id will be what is stored in the categories
//maybe on delete of a transaction, move the items in the deleted to a misc category?



//need to save to a collection instead of a single doc
export const saveNewCategoryToFirestore = async (
    uid: string, category:string, color:string, ts: Timestamp
    ): Promise<FirebaseSaveCategoryResponse> => {
    try {   
        const categoryDocRef = doc(db, "userCategories",uid);
        const colRef = collection(categoryDocRef, "categories")
        const docResp = await addDoc(
            colRef, {
                createdAt:ts,
                categoryName:category,
                color:color
            }).then((newDoc: DocumentReference) => {
                console.log(`User document for uid:${uid}`);
                return {
                    docId: newDoc.id,
                    success: true,
                    errorMessage:""
                };
            });
        return docResp;
    } catch (e) {
        console.error("Error creating category:", e);
        return {
            docId:"",
            success:false,
            errorMessage:JSON.stringify(e)
        };
    }
    // return {
    //     docId:newDoc.id,
    //     success: true,
    //     errorMessage:""
    // };
}

export const fetchUserCategories = async (
    uid: string
): Promise<Array<[string, ExpenseCategoryStruct]>> => {

    try {
        const colRef = collection(db, `userCategories`,uid,"categories" )
        const userDocs:Array<[string, ExpenseCategoryStruct]> = await getDocs(colRef).then(
            (val) => {
                const tempArray: Array<[string, ExpenseCategoryStruct]> = val.docs.map(
                    (d) => {
                    const categoryData: {categoryName: string, color: string, createdAt: Timestamp} = d.data() as ExpenseCategoryStruct; 
                    return [d.id,categoryData]}
                    )
                return tempArray;
            }
        );
        return userDocs;
    } catch (e) {
        console.log("an error occurred :",e);
        const tempArray: Array<[string, ExpenseCategoryStruct]> = [];
        return tempArray;
    }
}