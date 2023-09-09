import { View, Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { ExpenseItemData } from "../../types/types"
import BouncyCheckbox from "react-native-bouncy-checkbox";
type Props = {
    itemData: [ExpenseItemData,number]
    sendClickAction:  (id: number, isChecked: boolean) => void;
}


const CategoriseExpenseFactory:React.FC<Props> = ({itemData, sendClickAction}) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        sendClickAction(itemData[1], isChecked);

    },[isChecked])

    const isSelectedStyling = () => {
        if (!isChecked)
            return {
                backgroundColor: "#fdfdff"
            };
        return {backgroundColor: "#f2f2f2"}
    }

    return (
        <>
        {/* <View style={}> */}
            <Pressable  style={[styles.container, isSelectedStyling()]}>
                    <Text style={styles.itemName}>{itemData[0].item}</Text>
                    <Text style={styles.itemCost} >{itemData[0].costAndSign}</Text>
                    <BouncyCheckbox
                        size={25}
                        fillColor="#29339b"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "#29339b" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        onPress={(isChecked: boolean) => {
                            setIsChecked(isChecked)
                        }}
/>
            </ Pressable>
            {/* </View> */}
        </>
    )
}   

const styles = StyleSheet.create({
    pressableButton:{
        backgroundColor:"red"
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
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:10,
        textAlign:"baseline",
        borderRadius:3

    },
})

export default CategoriseExpenseFactory;