import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { ExpenseItemData } from "../../types/types"
type Props = {
    itemData: [ExpenseItemData,number]
    sendClickAction:  (id: number) => void;
}

const PendingExpenseFactory:React.FC<Props> = ({ itemData, sendClickAction } ) => {

    const onPressed = () => {
        sendClickAction(itemData[1])
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.itemName}>{itemData[0].item}</Text>
                <Text style={styles.itemCost} >{itemData[0].costAndSign}</Text>
                <View style={{backgroundColor:"black", height:"100%", width:0.3, marginRight:5}}/>
                <Pressable onPress={() => onPressed()} style={styles.pressableButton}>
                    <Ionicons name="close" size={24} color="#e2e2e2" />
                </ Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#f5f5f5",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:10,
        textAlign:"baseline",

    },
    itemName:{
        alignSelf:"center",
        maxWidth:"80%",
        fontSize:18,
        paddingLeft:5,
        flex:1,
        marginHorizontal:5,
        // backgroundColor:"green"
    },
    itemCost:{
        maxWidth:"20%",
        alignSelf:"center",
        fontSize:18,
        paddingRight:5,
        flex:1,
    },
    pressableButton:{
        marginRight:5,
        // backgroundColor:"red"
    }

})

export default PendingExpenseFactory;

