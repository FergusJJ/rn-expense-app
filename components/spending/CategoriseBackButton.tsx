import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";
import { Pressable, Text, StyleSheet, Platform } from "react-native"
import DropShadow from "react-native-drop-shadow";
type Props = {
    sendAction: () => void;
}

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

const CategoriseBackButton:React.FC<Props> = ({sendAction}) => {
    const [isActivePress, setIsActivePress] = useState<boolean>(false);
    generateBoxShadowStyle(
        1, 1, "#353935", 0.5, 4, 20, "#353935"
      )

    return (
        <DropShadow style={[styles.androidShadow, styles.iosShadow]}>
        <Pressable style={({ pressed }) => [pressed ?  [{opacity: 0.9, maxHeight:40, maxWidth:40},styles.confirmPendingButton]  : [styles.confirmPendingButton]]}
        onPress={sendAction}
        >
            <Ionicons name="arrow-back" size={24} color="#fdfdff" />
        </Pressable>
    </DropShadow>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"red",
        alignItems:"center",
    },
    textStyling:{
        fontSize:24
    },
    confirmPendingButton:{
        backgroundColor:"#7f96ff",
        borderRadius:1000,
        height:48,
        width:48,
        justifyContent:"center",
        alignItems:"center",
    },
    iconStyling:{paddingBottom:1},
    iosShadow:{},
    androidShadow:{}
})

export default CategoriseBackButton;