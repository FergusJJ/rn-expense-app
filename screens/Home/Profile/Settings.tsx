import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../../navigator/ProfileNavigator';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOutOfAccountFirebase } from '../../../firebase/authFunctions/signOutOfAccount';
import { useUserContext } from '../../../hooks/useUserContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpgradeButton from '../../../components/settings/UpgradeButton';
import SettingsModalComponent from "../../../components/settings/settingsModalComponent";
import { getAuth } from 'firebase/auth';
import _settingsState from '../../../helpers/_settingsState';

type SettingsProps = NativeStackScreenProps<ProfileStackParamList, "Settings">;


//reload component if auth.currentUser.displayName === undefined
const Settings:React.FC<SettingsProps> = (props) => {
    const {
        isLoggedIn, setIsLoggedIn, auth, setAuth
    } = useUserContext();
    
    const [userDisplayName, setUserDisplayName] = useState<string | null | undefined>("");
    const [userEmail, setUserEmail] = useState<string | null | undefined>("");

    
    useEffect(() =>{
      try {
        AsyncStorage.getItem("auth").then((item) => {
        //auth should be synced up with the context
        
        //this still returns displayName = undefined as the auth ahsn't updated yet
          if (item === null) return;
          const authObject = JSON.parse(item);
          setUserDisplayName(authObject["currentUser"]["displayName"])
          setUserEmail(authObject["currentUser"]["email"])
          if (userDisplayName === undefined) {
            setAuth(getAuth());
            //update AsyncStorage just to make sure
            AsyncStorage.setItem("auth", JSON.stringify(auth)).catch((error) => console.log(error));
          } 
        });

      } catch(error) {
        console.log(error)
      }


      
      
    },[])

    const signOutOfAccount = () => {
        //need to delete account info from asyncStorage, change the values in the context
        AsyncStorage.getItem("auth").then(
            (authItem) => {
                if (authItem === null) {
                    throw new Error("signOutOFAccount was used when auth not in storage");
                };
                // const auth = JSON.parse(authItem);
                signOutOfAccountFirebase().then(() => {
                    AsyncStorage.removeItem("auth").then(() => {
                        //key removed

                        setIsLoggedIn(false);
                        setAuth(null);
                        console.log("signed out successfully, context and storage cleared")
                        
                    }).catch(err => console.log(err))
                }
                ).catch((err) => {throw new Error(err)})
            }
        ).catch(err => {console.log(err)})
    
    }


  return (
<>
{/* Top SafeAreaView needed in order to color the top section of the screen only */}
  <SafeAreaView
     edges={["top"]}
     style={{ flex: 0, backgroundColor: "#29339b" }}
  />
  <SafeAreaView
     edges={["left", "right", "bottom"]}
     style={{
       flex: 1,
       backgroundColor: "#fdfdff",
       position: "relative",
     }}
  >
    {/* Banner */}
    <View style={styles.banner}>
        <Ionicons name="chevron-back-sharp" size={24} color="#fdfdff" onPress={() => {props.navigation.pop()}}/>
         <Text style={styles.bannerText} >Settings</Text>
        <Ionicons name="log-out-outline" size={24} color="#fdfdff" onPress={signOutOfAccount} />
    </View>
    <View style={styles.accountInfoWrapper}>
      <View style={styles.nameEmailWrapper}>
        <Text style={styles.nameStyling} >{userDisplayName}</Text>
        <Text style={styles.emailStyling}>{userEmail}</Text>
      </View>
      <Text style={styles.tierStyling}>Membership: Pay Plus</Text>
    </View>
    
    <SettingsModalComponent />
    {/*End Banner */}
  </SafeAreaView>
</>
  )
}
const styles = StyleSheet.create({
    banner: {
        backgroundColor:"#29339b",//"transparent",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        paddingVertical:10
        // paddingBottom:20
    },
    bannerText:{
        color:"#fdfdff",
        fontSize:24
    },
    accountInfoWrapper:{
      // backgroundColor:"red",
      marginVertical:"5%",
      flexDirection:"column",
      justifyContent:"flex-start",
      // alignItems:"center"
    },
    nameEmailWrapper:{
      alignSelf:"flex-start",
      marginLeft:"5%",
    },
    nameStyling:{
      fontSize:32,
      fontWeight:"600"
    },
    emailStyling: {
      fontSize:18,
      fontWeight:"200",
    }, 
    tierStyling:{
      fontSize:18,
      fontWeight:"100",
      marginLeft:"5%"
    }

})

export default Settings