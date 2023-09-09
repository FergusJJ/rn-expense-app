import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Home/Profile/Profile';
import Settings from '../screens/Home/Profile/Settings';
import Budgets from '../screens/Home/Budgets';
export type ProfileStackParamList = {
    Profile: undefined;
    Settings: undefined;
    Budgets: undefined;
}

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
      {/* <ProfileStack.Screen name="Budgets" component={Budgets} options={{headerShown:false}} /> */}
      <ProfileStack.Screen name="Settings" component={Settings} options={{headerShown:false}} />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator