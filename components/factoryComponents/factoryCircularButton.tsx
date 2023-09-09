import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";
import { Pressable, StyleSheet, Platform, Text } from "react-native"
import DropShadow from "react-native-drop-shadow";
import { Glyphmap } from "../../types/types";

type Props = {
    sendAction: () => void;
    icon?: keyof Glyphmap;
    text?: string;
    size: number;
    height: number;
    width: number; 
    color: string;
    bgColor: string;
    animateWidth: number;
    animateHeight: number;
    radius:number;
    extraStyles?:{[key:string]: string | number};
    shadow?: boolean;
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

const FactoryCircularButton:React.FC<Props> = ({sendAction, icon, text, size, bgColor, color, height, width, animateHeight, animateWidth, radius, extraStyles, shadow} ) => {
    generateBoxShadowStyle(
        1, 1, "#353935", 0.5, 4, 20, "#353935"
      )

    return (
        <DropShadow style={shadow ? [styles.androidShadow, styles.iosShadow] : {}}>
        <Pressable style={({ pressed }) => [pressed ?  [{
            opacity: 0.9, maxHeight:animateHeight, maxWidth:animateWidth, backgroundColor:bgColor, height:height, width:width, borderRadius:radius
        },styles.confirmPendingButton,]  : [styles.confirmPendingButton, {backgroundColor:bgColor, height:height, width:width, borderRadius:radius}]]}
        onPress={sendAction}
        >
            {
            text === undefined ? 
            <Ionicons name={icon} size={size} style={[{color:color}, extraStyles]}/>
            : <Text
                style={{
                    color:color,
                    fontSize:size,
                }}
            >{text}</Text>
            }
            
        </Pressable>
    </DropShadow>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
    },
    textStyling:{
        fontSize:24
    },
    confirmPendingButton:{
        justifyContent:"center",
        alignItems:"center",
    },
    iconStyling:{paddingBottom:1},
    iosShadow:{},
    androidShadow:{}
})

export default FactoryCircularButton;