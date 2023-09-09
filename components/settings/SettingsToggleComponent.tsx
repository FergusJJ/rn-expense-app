import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { useAppSettingsContext } from '../../hooks/useAppSettingsContext';
import { Themes } from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = {
    id: string;
    settingName: string;
    iconName: string;
    sendActionLower: Function;
};


const SettingsToggleComponent: React.FC<Props> = ( {id, settingName, sendActionLower} ) => {
    const {
        theme, setTheme,
    } = useAppSettingsContext();
    //theme saves when you exit profile screen but doesn't persist when you reload the app.
    const [isLight, setIsLight] = useState<boolean>(true);
    useEffect(() => {
        if (theme === Themes.LIGHT) {
            setIsLight(true);
        } else if (theme === Themes.DARK) {
            setIsLight(false);
        } else {
            setIsLight(false);
        }
    }, [])

    return (
        <TouchableOpacity  onPress={() => {
            //changing asyncStorage will cause rerender at root? -> false
            if (theme === Themes.LIGHT) {
                setIsLight(false)
                setTheme(Themes.DARK)
            } else {
                setIsLight(true)
                setTheme(Themes.LIGHT)
            }

        }}>
            <View style={styles.settingLayout}>
            {/* Make sure that the possible names for the icons are used instead of random icon names */}
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="theme-light-dark" size={24} color="#5a5a5a" />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.textContainerLayout}>
                        <Text style={styles.settingName}>{settingName}</Text>
                        <View style={styles.arrowSettingValueContainer}>
                            {
                                isLight?
                                <Ionicons name="ios-sunny-sharp" size={24} color="#5A5A5A" />
                                : <Ionicons name="ios-moon-sharp" size={24} color="#5A5A5A" />
                            }
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    settingLayout:{
        flexDirection:"row", 
        justifyContent:"flex-start",
        marginTop:10
        
    },
    iconContainer: {
        // backgroundColor:"red",

        paddingRight:"5%",
        marginRight:"2%",
        borderRightColor:"#000000",
        borderRightWidth:0.3,
    },
    textContainer: {
        // backgroundColor:"red",
        paddingLeft:"5%",
        flex:1,
        justifyContent:"center",
    },
    textContainerLayout:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    settingName: {
        fontSize:18
    },
    arrowSettingValueContainer:{
        // flex:1,
        flexDirection:"row",
        alignItems:"center",

    },
    selectedSettingValue: {
        fontSize:18,
        fontWeight:"300",
        color:"#5A5A5A",
        paddingRight:"5%",
        marginRight:"2%",
    }
})

export default SettingsToggleComponent;