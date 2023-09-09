import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView  } from 'react-native'
import React, { useEffect, useState } from 'react'
import SettingsBlock from './SettingsBlock';
import { Ionicons } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import UpgradeButton from './UpgradeButton';
const SettingsModalComponent = () => {

    const [actionTriggered, setActionTriggered] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);
    //need to setActionTriggered("") once the "x" on the modal is pressed
    useEffect(()=> {
        if (actionTriggered === "PREFERENCES_THEME") return;
        if(actionTriggered !== "") {
            setModalVisible(true)
        }
    }, [actionTriggered]);


    const sendActionTriggered = (modalId: string) => {
        setActionTriggered(modalId);
    };


    //need to pass the baseComponent id 
    //maybe not all settingsBlocks need to be a modal
    return (
        <ScrollView style={{marginBottom:"17%", backgroundColor:"#fdfdff"}}>
            <View style={styles.modalContainer}>
                <UpgradeButton sendAction={sendActionTriggered}/>
                <SettingsBlock settingBlockName="Preferences" sendAction={sendActionTriggered} />
                <SettingsBlock settingBlockName="About" sendAction={sendActionTriggered} /> 
                <SettingsBlock settingBlockName="Help" sendAction={sendActionTriggered} />
            </View>
{/* Need to pass whether modal is active up the components      */} 
        <GestureRecognizer

          style={{flex: 0}}
          onSwipeDown={ () => {
            setModalVisible(false)
            setActionTriggered("")}}
            >     
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                // presentationStyle="formSheet"
            >
                <View style={styles.modalEmbeddedViewContainer}>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(false)
                        setActionTriggered("")
                    }}>
                        <Ionicons name="ios-close-sharp" size={32} color="black" />
                    </TouchableOpacity>
                    <View style={styles.modalEmbeddedView}>
                        {/** These will all be seperate components, for those that don't require a modal,
                         * will have to conditionally setModalVisible depending on the action
                        */}
                        {
                            actionTriggered === "PREFERENCES_THEME" 
                            ? <Text>theme</Text>
                            : actionTriggered === "PREFERENCES_NOTIFICATIONS" 
                            ? <Text>notifications</Text>
                            : actionTriggered === "PREFERENCES_CURRENCY"
                            ? <Text>currency</Text>
                            : actionTriggered === "ABOUT_VERSION"
                            ? <Text>Version</Text>
                            : actionTriggered === "HELP_DELETE_ACCOUNT"
                            ? <Text>delete</Text>
                            : actionTriggered === "UPGRADE"
                            ? <Text>Checkout screen</Text>
                            : <Text>Error</Text>
                        }
                        
                    </View>
                </View>
            </Modal>
        </GestureRecognizer>
        </ScrollView >

    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
        flexDirection:"column",
        backgroundColor:"#fdfdff"
    },
    modalEmbeddedViewContainer: {
        marginTop:"30%",
        backgroundColor:"#fdfdff",
        flex:1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        shadowRadius:2,
        shadowOpacity:0.1,
        shadowColor:"#353935",
        padding:"5%"
        
    },
    modalEmbeddedView:{
        padding:"5%"
    }
        });

export default SettingsModalComponent