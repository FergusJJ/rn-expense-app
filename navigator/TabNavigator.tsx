import React, { useEffect, useState } from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Profile from '../screens/Home/Profile/Profile';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { View,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileNavigator from './ProfileNavigator';
import Budgets from '../screens/Home/Budgets';
import ManualEntry from '../screens/Home/ManualEntry';
import { UserDataContextProvider } from '../components/contexts/UserDataContext'
import { useUserContext } from '../hooks/useUserContext';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const {auth} = useUserContext();
  const [uid, setUid] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => { 
    if (auth === null) {
      throw new Error("Auth is null in TabNavigator")
    }
    const authStruct = JSON.parse(auth);
    setUid(authStruct.currentUser.uid);
    // console.log(authStruct.currentUser.uid)
  },[])


  //Perform all async calls that relate to the user here.
  if ( uid === "" ) {
    return (
      <Text>
        Loading
      </Text>
    )
  }


  return (

    <UserDataContextProvider uidProp={uid}>

      <Tab.Navigator screenOptions={
        ({ route }) => ({
          
          tabBarActiveTintColor:"#29339b",
          tabBarShowLabel:false,        
          tabBarIcon: ( {focused} : { focused : boolean }) => {
            let imgName;
            let color;
            let scanBackgroundColour;
            if (route.name === "Home"){
              imgName = focused ? "ios-home-sharp" : "ios-home-outline";
              color = focused ? "#29339b" : "black"            
            } else if (route.name === "Budgets") { 
              imgName = focused ? "pie-chart" : "pie-chart-outline";
              color = focused ? "#29339b" : "black";
              
            } else if(route.name === "ManualEntry"){
              color = focused ? "#fdfdff" : "#ebecf9"
              scanBackgroundColour = focused ?  "#29339b" : "#7f96ff";
              return (
                <View
                style={{
                  position: 'absolute',
                  bottom: 5, // space from bottombar
                  height: 68,
                  width: 68,
                  borderRadius: 58,
                  backgroundColor: scanBackgroundColour,
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}>
                  <Ionicons name="add" size={47} color={color} style={{ height:48, width:48, textAlign:"center", paddingLeft:2, paddingBottom:1}}/>
              </View>
              );
            } else{
              imgName = focused ? "person-circle-sharp" : "person-circle-outline";
              color = focused ? "#29339b" : "black"
            };
            
            return <Ionicons name={imgName as "ios-person-circle-sharp"} size={24} color={color} />
          },
          tabBarStyle:{
            backgroundColor: '#f5f5f5',
            borderTopWidth: 0,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 70,
          }
  
        })      
      }>
          <Tab.Screen name="Budgets" component={Budgets} options={{headerShown:false}} />
          <Tab.Screen name="ManualEntry" component={ManualEntry} options={{headerShown:false}} />
          <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{headerShown:false}}/>
      </Tab.Navigator>
      
    
    </UserDataContextProvider>
    
  )
    
}

export default TabNavigator