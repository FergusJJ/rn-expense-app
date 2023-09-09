import { Text, View, StyleSheet } from "react-native";
import { useState } from 'react'

import SettingsBaseComponent from "./SettingsBaseComponent"
import SettingsToggleComponent from "./SettingsToggleComponent";


type Props = {
    settingBlockName: string;
    sendAction: Function;
};

//should contain the name of the setting along with the SettingBaseComponents that the setting contains
const SettingsBlock:React.FC<Props> = ({settingBlockName, sendAction}) => {
    const [actionTriggered, setActionTriggered] = useState<string>("");

    const sendActionTriggered = (modalId: string) => {
        sendAction(modalId);
    };

    
    {/* Will need to set iconName base on the currency selected*/}
    //need to conditionally render the correct SettingsBaseComponents based on the settingBlockName
    switch (settingBlockName){ 
        case "Preferences":
            return (
                <View style={styles.settingContainer}>
                    <View style={styles.settingBlockNameStyleContainer}> 
                        <Text style={styles.settingBlockNameStyle}>{settingBlockName}</Text>
                    </View>
                    {/* Will need to build in some inline info blcok to the settingsBase to display the theme/current notification preferences/currency */}
                    {/* Since not all will be done like this, maybe a prop will be needed to decide whether to render the additional info on the RHS */}
                    <SettingsToggleComponent id="PREFERENCES_THEME" settingName="Theme" iconName="ios-moon-outline" sendActionLower={sendActionTriggered} />
                    <SettingsBaseComponent id="PREFERENCES_NOTIFICATIONS" settingName="Notifications" iconName="ios-notifications-circle-outline" sendActionLower={sendActionTriggered} />
                    <SettingsBaseComponent id="PREFERENCES_CURRENCY" settingName="Currency" iconName="ios-cash-outline" sendActionLower={sendActionTriggered} /> 
                </View>
            );
        case "About":
            return (
                <View style={styles.settingContainer}>
                    <View style={styles.settingBlockNameStyleContainer}> 
                        <Text style={styles.settingBlockNameStyle}>{settingBlockName}</Text>
                    </View>
                    {/* Will need to build in some inline info blcok to the settingsBase to display the theme/current notification preferences/currency */}
                    <SettingsBaseComponent id="ABOUT_VERSION" settingName="Version" iconName="ios-apps-outline" sendActionLower={sendActionTriggered} />

                </View>
            )    
            //probably want this at the bottom
        case "Help":
            return (
                <View style={styles.settingContainer}>
                <View style={styles.settingBlockNameStyleContainer}> 
                    <Text style={styles.settingBlockNameStyle}>{settingBlockName}</Text>
                </View>
                {/* Will need to build in some inline info blcok to the settingsBase to display the theme/current notification preferences/currency */}
                <SettingsBaseComponent id="HELP_DELETE" settingName="Delete" iconName="ios-person-circle-outline" sendActionLower={sendActionTriggered} />
                
            </View>
            )
        
        default:
            //should never be hit
            return (
                <>
                {console.log("SettingsBlock: ERROR, default case hit")}
                    <Text>ERROR</Text>
                </>
            );
    }
};

const styles = StyleSheet.create({
    settingContainer:{
        flexDirection:"column",
        marginHorizontal:"5%",
        marginVertical:"2.5%",
        paddingHorizontal:"5%",
        paddingVertical:"5%",
        borderRadius:10,
        backgroundColor:"white",
        shadowColor:"#353935",
        shadowRadius:10,
        shadowOpacity:0.1
    },
    settingBlockNameStyleContainer:{
        // borderBottomColor:"#000000", //might not use, idk yet
        // borderBottomWidth:0.3,
        marginBottom:5
    },
    settingBlockNameStyle: {
        fontSize:24,
        marginBottom:5,
        fontWeight:"bold"
    }
})

export default SettingsBlock;