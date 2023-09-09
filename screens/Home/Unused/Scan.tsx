import { Linking, Text, StyleSheet, TouchableOpacity, View, NativeModules, Platform, Button, Modal, ScrollView } from "react-native"
import { BarCodeScanner, BarCodeBounds, BarCodePoint } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GestureRecognizer from 'react-native-swipe-gestures';


const { RNAndroidOpenSettings } = NativeModules;

type barcodeScanParams = {
    type: string;
    data: string;
    bounds: BarCodeBounds;
    cornerPoints: BarCodePoint[];
}

//Will have to come back to this and use OCR instead


const Scan:React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [modalVisible, setModalVisible]=  useState<boolean>(false);

    const getBarcodeScannerPermissions = async () => {
        const { status, canAskAgain } = await BarCodeScanner.requestPermissionsAsync();
        if (!canAskAgain && hasPermission === false) {
            const openAppSettings = () => {
                if (Platform.OS === 'ios') {
                    Linking.openURL("app-settings:");
                } else {
                    RNAndroidOpenSettings.appDetailsSettings();
                }
                };
            openAppSettings();
            return
        }
        setHasPermission(status === "granted")
    };

    useEffect(()=> {
        getBarcodeScannerPermissions();
    },[])
    
    useEffect(() => {
        scanned === true ? setModalVisible(true) : setModalVisible(false);

    }, [scanned]);

    const handleBarcodeScan = ({type, data}: barcodeScanParams) => {
        setScanned(true);
        alert(`barcode has with type ${type} has been scanned ${data}`)
    };

 
    if (hasPermission === null) {
        return (
            <>
                <SafeAreaView style={{flex:0, backgroundColor:"#3423a6"}}/>
                <Text>
                    Waiting for permission.
                </Text>
            </>
        )
    }

    if (hasPermission === false) {
        return (
            <>
                <SafeAreaView style={{flex:0, backgroundColor:"#3423a6"}}/>
                <SafeAreaView style={styles.mainViewContainer}>
                    <View style={styles.noAccessContainer}>
                        <Text style={styles.accessMessageText}>
                        You must allow camera access for this feature
                        </Text>
                        <TouchableOpacity style={styles.updateAccessButton} onPress={() => {
                            getBarcodeScannerPermissions()
                        }}>
                            <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:18}}>
                                Update Permissions
                            </Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>

                
            </>
        )
    }

    return (
        <>
            <SafeAreaView style={{flex:0, backgroundColor:"#3423a6"}}/>
            <SafeAreaView style={styles.mainViewContainer}> 
            {!scanned &&   
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarcodeScan}
                    style={StyleSheet.absoluteFillObject}
                />
            }
                
            
            {scanned &&
            <>
            {/*
            Want to display a list of what was scanned in to the app and then present the option to uncheck items
            Then want to add a continue button to move to a page that allows the user to mark them as the correct category
            After this it should give the option to save to the users transactions
            */}
                <Text></Text>
                
                <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
            </>
            }
            {/* <GestureRecognizer
            style={{flex: 0}}
            onSwipeDown={ () => {
                setModalVisible(false)
            }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                >
                <Text>
                    Hi
                </Text>
            </Modal>
            </GestureRecognizer> */}

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    mainViewContainer:{
        flex:1,
        backgroundColor:"#fdfdff"
    },
    noAccessContainer:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal:"10%"
    },
    accessMessageText: {
        fontWeight:"bold",
        fontSize:18,
        textAlign:"center"
    },
    updateAccessButton: {
        backgroundColor:"#7f96ff",
        marginHorizontal:"5%",
        marginVertical:"2.5%",
        paddingHorizontal:"5%",
        paddingVertical:"5%",
        borderRadius:10,
        shadowColor:"#353935",
        shadowRadius:10,
        shadowOpacity:0.1
        
    }
});

export default Scan;