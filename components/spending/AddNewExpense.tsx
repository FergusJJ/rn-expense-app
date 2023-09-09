import { Text, StyleSheet, View, Platform, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import DropShadow from "react-native-drop-shadow";
type Props = {
    sendAction: Function;
};



const generateBoxShadowStyle = (
    xOffset: number,
    yOffset: number,
    shadowColorIos: string,
    shadowOpacity: number,
    shadowRadius: number,
    elevation: number,
    shadowColorAndroid: string,
  ) => {
    if (Platform.OS === 'ios') {
      styles.iosShadow = {
        shadowColor: shadowColorIos,
        shadowOffset: {width: xOffset, height: yOffset},
        shadowOpacity,
        shadowRadius,
      };
      styles.androidShadow = {};
    } else if (Platform.OS === 'android') {
      styles.androidShadow = {
        elevation,
        shadowColor: shadowColorAndroid,
      };
      styles.iosShadow = {}
    }
  };

const AddNewExpense:React.FC<Props> = ({sendAction}) => {
    generateBoxShadowStyle(
      1, 1, "#353935", 0.5, 4, 20, "#353935"
    )
    return (
        <DropShadow style={[styles.androidShadow, styles.iosShadow]}>
        <Pressable style={({ pressed }) => [pressed ?  [{opacity: 0.9},styles.container]  : [styles.container, {opacity: 1}]]}

   onPress={() => sendAction()}>
            <View style={styles.textIconWrapper}>
                {/* <View style={{}}> */}
                <Text style={styles.buttonText}>
                    Track new expense
                </Text>
                {/* </View> */}
                {/* <Pressable onPress={() => sendAction()}> */}
                    <View style={{paddingLeft:1}}>
                    <Ionicons name="add-circle-outline" size={24} color="#fdfdff" />
                    </View>
                    
                {/* </Pressable> */}
            </View>
            </Pressable>
        </DropShadow>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        marginHorizontal:"5%",
        marginVertical:"2.5%",
        paddingHorizontal:"5%",
        paddingVertical:"5%",
        borderRadius:10,
        backgroundColor: "#29339B",
        shadowColor:"#353935",
        shadowRadius:10,
        shadowOpacity:0.1

    },
    textIconWrapper:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    buttonText:{
        color:"white",
        fontSize:20
    },
    iosShadow:{},
    androidShadow:{}
})

export default AddNewExpense;