import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { useAppSettingsContext } from '../../hooks/useAppSettingsContext';

type Props = {
    id: string;
    settingName: string;
    iconName: string;
    sendActionLower: Function;
};

const SettingsBaseComponent:React.FC<Props> = ({id, settingName, iconName, sendActionLower}) => {
    // let settingVal = "default";
    const {
        theme,
        setTheme,
        currency,
        setCurrency,
        notifications,
        setNotifications
    } = useAppSettingsContext();

    let settingVal = "";
    switch (id) {
        case "PREFERENCES_THEME":
            settingVal = theme.toLowerCase();
            break;
        case "PREFERENCES_NOTIFICATIONS":
            if (notifications == false){
                settingVal = "disabled"
            } else if (notifications == true) {
                settingVal = "enabled"
            };
            break;
        case "PREFERENCES_CURRENCY":
            settingVal = currency;
            break;
        case "ABOUT_VERSION":
            settingVal = "v0.0.1";
            break;
        case "HELP_DELETE":
            settingVal = "delete";
            break;

    };
    
    // })


    return (
        <TouchableOpacity  onPress={() => {
            
            sendActionLower(id)
            
            }}>
            <View style={styles.settingLayout}>
            {/* Make sure that the possible names for the icons are used instead of random icon names */}
                <View style={styles.iconContainer}>
                    <Ionicons name={iconName as "ios-moon-outline" || "ios-notifications-circle-outline" || "ios-apps-outline" || "ios-person-circle-outline"}   size={24} color="#5A5A5A" onPress={() => {}}/>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.textContainerLayout}>
                        <Text style={styles.settingName}>{settingName}</ Text>
                        <View style={styles.arrowSettingValueContainer}>
                            <Text style={styles.selectedSettingValue}>{settingVal}</Text>
                            <Ionicons name="ios-chevron-forward" size={24} color="#5A5A5A" />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    )
};

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

export default SettingsBaseComponent;

/**
ios-notifications-circle-outline

 */