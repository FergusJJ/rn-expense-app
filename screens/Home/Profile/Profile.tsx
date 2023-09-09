import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useUserContext } from '../../../hooks/useUserContext'
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from '../../../navigator/ProfileNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';


//Want this to contain an overview of spending, should have the pie chart
//Should alos Note the total spend over a set period of time
//As well as how much left in the current period of time for the overall budget.
type ProfileProps = NativeStackScreenProps<ProfileStackParamList, "Profile">;


const Profile: React.FC<ProfileProps> = (props) => {
  const {isLoggedIn, setIsLoggedIn, auth, setAuth} = useUserContext();

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
               backgroundColor: "#fff",
               position: "relative",
             }}
          >
            {/* Banner */}
            <View style={styles.banner}>
                 <Text style={styles.bannerText}>Profile</Text>
                 <TouchableOpacity style={{position:"absolute", right:20}} onPress={() => {props.navigation.push("Settings")}}>
                 <Ionicons name="ios-settings-outline" size={24} color="#fdfdff" />
                 </TouchableOpacity>
            </View>
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
            }
        
        })


// const styles = StyleSheet.create({
//   container:{backgroundColor:"#fdfdff"},
//   header:{
//     // flex:1,
//     justifyContent:'center'
//   },
// })

export default Profile