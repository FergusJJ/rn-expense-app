
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export type AuthStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
}


const AuthStack = createNativeStackNavigator<AuthStackParamList>();



const GetStarted = () => {


  return (
    <AuthStack.Navigator initialRouteName="LogIn">
      <AuthStack.Screen name="LogIn" component={LogIn} options={{headerShown:false}}/>
      <AuthStack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
    </AuthStack.Navigator>

  )
}
export default GetStarted