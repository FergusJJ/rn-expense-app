import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import TabNavigator from './TabNavigator'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { authSess } from '../firebase/firebaseConfig'
import GetStarted from '../screens/GetStarted/GetStarted'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserContext } from '../hooks/useUserContext'
import { getUserFromFirestore } from '../firebase/firestore/AddUser'


export type RootStackParamList = {
    GetStarted: undefined;
    Main: {user: User};
}

const RootStack = createNativeStackNavigator()

const RootNavigator = () => {
  const {auth, setAuth, isLoggedIn, setIsLoggedIn} =  useUserContext();

  useEffect(() => {
    // const auth = getAuth();
    //looks like this runs as soon as account is created, before the display name is updated, so display name is undefined until the user reloads
    onAuthStateChanged(authSess, (user) => {
      if (user){
        if (authSess.currentUser?.uid !== undefined && authSess.currentUser.displayName !== null) {
          
          getUserFromFirestore(authSess.currentUser?.uid, authSess.currentUser.displayName ).then(
            (val:boolean) => {
              if (!val) {
                console.log("error fetching from firebase")
              } else {
              console.log("fetched from firebase")
            }

            }
          )
        } else return;
        const persistAuth = async () => AsyncStorage.setItem("auth", JSON.stringify(authSess));
        persistAuth();
        //want to check whether auth is in firestore/firebase
        setIsLoggedIn(true);
        setAuth(JSON.stringify(authSess)); //make sure asyncStorage is in sync with userContext
      };
    });
  }, []);
  

  
  
  //check context/asyncStorageHere
  
  return (
    <RootStack.Navigator>
      { (auth === null) && (!isLoggedIn) ?
      <RootStack.Screen name="GetStarted" component={GetStarted} options={{headerShown: false}} /> :
        <RootStack.Screen name="Main" component={TabNavigator} options={{headerShown: false}}/>}
    </RootStack.Navigator>
  )
}

export default RootNavigator