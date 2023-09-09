import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type Props = {
    sendAction: Function;
};

const UpgradeButton: React.FC<Props> = ({sendAction}) => {
    return (
        <TouchableOpacity
        style={{
            backgroundColor:"#fdfdff",
        }}
        onPress={() => {
            //need to take in function as prop in order to see when button is pressed    
            sendAction("UPGRADE")
        }}
        >
            <View style={styles.buttonMain}>
                <Text style={styles.callToAction}>Upgrade Membership</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonMain:{
        backgroundColor:"#7f96ff",
        marginHorizontal:"5%",
        marginVertical:"2.5%",
        paddingHorizontal:"5%",
        paddingVertical:"5%",
        borderRadius:10,
        shadowColor:"#353935",
        shadowRadius:10,
        shadowOpacity:0.1
    },
    callToAction:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold",
        fontSize:18
    }
})

export default UpgradeButton;