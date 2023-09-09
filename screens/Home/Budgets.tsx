import { Text, StyleSheet, View, Button } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSettingsContext } from "../../hooks/useAppSettingsContext";
// type BudgetProps = NativeStackScreenProps<ProfileStackParamList, "Budgets">

const Budgets:React.FC = () => {
    const {
      theme, setTheme, 
      notifications, setNotifications, 
      currency, setCurrency
  } = useAppSettingsContext();
  
      //asynchronous calls to fetch data, loading page should display 
  
  
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
                   <Text style={styles.bannerText}>Welcome Back</Text>
              </View>
              {/*End Banner */}
              <Text>{theme}</Text>
              <Button onPress={() => {AsyncStorage.clear()}} title="clear storage"></Button>
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
export default Budgets;