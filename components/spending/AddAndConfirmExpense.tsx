import { View, TextInput, StyleSheet, Animated, TouchableOpacity, Pressable, Text } from "react-native";
import { useEffect, useState } from "react";
import CurrencyInput from 'react-native-currency-input';
import { ExpenseItemData } from "../../types/types";
import { Ionicons } from "@expo/vector-icons";
import FactoryCircularButton from "../factoryComponents/factoryCircularButton";
type Props = {
    sendItem:  ({ item, cost, costAndSign }: ExpenseItemData) => void;
}
const AddAndConfirmExpense: React.FC<Props>  = ({sendItem}) => {

    const [expenseValue, setExpenseValue] = useState<number | null>(null);
    const [expenseItem, setExpenseItem] = useState<string>("");
    const [expenseValueAndSign, SetExpenseValueAndSign] = useState<string>("");
    const [validExpenseItem, setValidExpenseItem] = useState<boolean>(false);



    const onChangeExpenseItem = (text: string) => {
        setExpenseItem(text);
        if (text.trim().length === 0) {
            setValidExpenseItem(false);
            return;
        }
        setValidExpenseItem(true)
    };

    const onButtonPress = () => {
        const newData:ExpenseItemData = {
            item:expenseItem,
            costAndSign:expenseValueAndSign === "" ? "£0.00" : expenseValueAndSign,
            cost:expenseValue === null ? 0 : expenseValue
        } 
        sendItem(newData);
        setExpenseValue(null);
        setExpenseItem("");
    };

    return (
        <View>
       
         <View style={[styles.inputsContainer, styles.shadowProp]}>
            <TextInput
                style={styles.textInputArea}
                placeholder='Item'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => {onChangeExpenseItem(text)}}
                value={expenseItem}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <View style={styles.verticalLine}/>
            <CurrencyInput 
                style={styles.currencyInputArea}
                value={expenseValue}
                placeholder="0.00"
                placeholderTextColor="#aaaaaa"
                onChangeValue={setExpenseValue}
                prefix="£"
                delimiter=","
                separator="."
                precision={2}
                minValue={0}
                onChangeText={(formattedValue) => {
                    SetExpenseValueAndSign(formattedValue)
                }}
            />
            <View style={{ justifyContent:"center", marginRight:10, maxWidth:"10%"}}>
                <FactoryCircularButton sendAction={onButtonPress} icon={"add"} size={24} color={validExpenseItem ? "#fdfdff" : "#f9f9f9"} bgColor={validExpenseItem ? "#7f96ff" : "#e2e2e2"} height={32} width={32} animateHeight={40} animateWidth={40} radius={10} extraStyles={{paddingLeft:2}} />
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    confirmInputContainer:{
        backgroundColor:"#7f96ff",
        height: 48,
        flexDirection:"row",
        paddingVertical:10,
        justifyContent:"center",
    },
    inputsContainer:{
        backgroundColor:"white",
        height: 48,
        flexDirection:"row",
        paddingVertical:10,
        marginVertical:10,
        justifyContent:"space-between",   
    },
    shadowProp: {
        shadowColor: '#353935',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        
      },
    textInputArea:{
        width:"50%",
        maxWidth:"50%",
        marginLeft:20,
    },
    verticalLine:{
        height: "100%",
        width: 1,
        backgroundColor: "#909090",
        marginHorizontal:5,
        
    },
    currencyInputArea:{
        maxWidth:"20%",
        width:"20%",
        marginRight:20
        
    },

})

export default AddAndConfirmExpense;