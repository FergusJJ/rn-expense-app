import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text, FlatList, View, ScrollView, Modal} from "react-native"
import AddNewExpense from "../../components/spending/AddNewExpense"
import { useEffect, useState } from "react"
import GestureRecognizer from 'react-native-swipe-gestures';
import { ExpenseItemData, ExpenseCategoryStruct } from "../../types/types";
import AddAndConfirmExpense from "../../components/spending/AddAndConfirmExpense";
import PendingExpenseFactory from "../../components/spending/PendingExpenseFactory";
import FactoryCircularButton from "../../components/factoryComponents/factoryCircularButton";
import CategoriseExpenseFactory from "../../components/spending/CategoriseExpenseFactory";
import EnterNewCategory from "../../components/spending/categories/EnterNewCategory";
import { useUserDataContext } from "../../hooks/useUserDataContextProvider";

const ManualEntry = () => {
    //uid is not set
    const {savedCategories, setSavedCategories, uid, setUid} = useUserDataContext();
    const [isValid, setIsValid] = useState(false);
    const [expenseItem, setExpenseItem] = useState<ExpenseItemData>({
        item:"",
        cost:0,
        costAndSign:""
    });
    
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isConfirmedExpense,setIsConfirmedExpense] = useState<boolean>(false);    
    const [isConfirmedCategorised,setIsConfirmedCategorised] = useState<boolean>(false);
    const [savedExpenseItem, setSavedExpenseItem] = useState<Array<[ExpenseItemData, number]>>([]);
    const [highlightedCategoriseItem, setHighlightedCategoriseItem] = useState<Array<number>>([]);
    const [currentHighestItemId, setCurrentHighestItemId] = useState<number>(0);
    const [newCategoryModal, setNewCategoryModal] = useState<boolean>(false);

    const sendFactoryDeleteAction = (id: number) => {
        const filteredData = savedExpenseItem.filter(item => item[1] !== id);
        setSavedExpenseItem(filteredData);   
    }
    const sendHighlightCategoriseItem = (id: number, isChecked: boolean) => {
        if (isChecked) {
            setHighlightedCategoriseItem([id,...highlightedCategoriseItem])
            return
        }
        setHighlightedCategoriseItem(highlightedCategoriseItem.filter(item => item !== id))
    }
    const sendActionLower = () => {
        setIsClicked(true)
    }
    const sendExpenseItemLower = ({item, cost, costAndSign}: ExpenseItemData ) => {
        setExpenseItem({
            item: item,
            cost: cost,
            costAndSign:costAndSign
        })
    }
    //may be a bug here?
    const sendSetSavedCategories = (newCategory: [string, ExpenseCategoryStruct]) => {
        setSavedCategories(newCategory,...savedCategories);
    }
    
    const confirmPendingItems = () => {
        if (savedExpenseItem.length === 0) return;
        setIsConfirmedExpense(true);
    }

    const confirmCatgegorisedItems = () => {
        setIsConfirmedCategorised(true);
    };

    const sendReOpenPreviousModal = () => {
        setIsModalVisible(true)
    }

    useEffect(() => {
        console.log("in useEffect:",savedCategories)
    },[savedCategories])

    useEffect(()=> {
        //don't want to add amy empty items to the array.
        if (expenseItem.item.length === 0) return;
        setSavedExpenseItem([[expenseItem, currentHighestItemId],...savedExpenseItem])
        // savedExpenseItem.push([expenseItem, currentHighestItemId]);
        setCurrentHighestItemId(currentHighestItemId+1)
        // console.log(`Current Items: ${JSON.stringify(savedExpenseItem)}\nCurrent highest id:${currentHighestItemId}`)
    },[expenseItem])

    useEffect(() => {
        if (expenseItem.item.trim().length === 0) {
            setIsValid(false)
        } else {
            if (isValid === true) return;
            setIsValid(true)
        }
        
    },[expenseItem])

    useEffect(() => {
        //want to actually have the data that the customer entered here, then add that to some
        //pending component, which will be displayed a bit further down
        //From there also want to display a "next" component which when clicked should allow the user to select the
        //category for the expenses that they have added from the categories they've made.
        //if they have no categories maybe could ask them to create them on first login, or
        //could just allow them to make them on the go.
        //maybe some sort of list with an input at the top which they cvan create a new category in.
        
        if (!isConfirmedExpense) return;
        console.log("expense confirmed")
        // setIsConfirmedExpense(false) 
    }, [isConfirmedExpense])

    useEffect(()=>{
        if (!isClicked) {
            setIsConfirmedExpense(false)
            setExpenseItem({item:"",cost:0,costAndSign:""})
            return
        };
        setIsModalVisible(true);
        setIsClicked(false);
    },[isClicked]);
    return (
        <>

        <SafeAreaView
               edges={["top"]}
               style={{ flex: 0, backgroundColor: "#29339b" }}/>
            <SafeAreaView   edges={["left", "right", "bottom"]}
                    style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        position: "relative",
                    }}
                >
                                 
                    <View style={styles.banner}>
                    {/* <Shadow> */}
                        <Text style={styles.bannerText}>Spending</Text>
                    </View>
                    {/* </Shadow> */}
                <ScrollView>
                    <View>

                    {/* <View style={styles.shadowProp}>    */}

                        <AddNewExpense sendAction={sendActionLower} />
                    {/* </View> */}

                    {/* Want to render past entries here */}
                        <Text>Yo</Text>
                    </View>
                    <GestureRecognizer
                    config={{gestureIsClickThreshold:100}}
                    style={{flex: 0}}
                    onSwipeDown={ () => {setIsModalVisible(false)}}>     
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onDismiss={()=> {
                    setNewCategoryModal(false)
                }}
                // presentationStyle="formSheet"
            >
                
                <View style={styles.modalEmbeddedViewContainer}>
                <View style={{flex:0, width:"15%", height:3, backgroundColor:"#e2e2e2", alignSelf:"center", borderRadius:1000, marginVertical:10}}/>
                {
                    isConfirmedExpense ?
                    <>
                    <View style={styles.expenseConfirmedContainer}>
                    {
                    newCategoryModal ? 
                        <EnterNewCategory existingCategories={savedCategories} reopenPreviousModal={() => {setNewCategoryModal(false)}} uid={uid} updateExistingCategories={sendSetSavedCategories}/>
                    :
                    <>
                    <FactoryCircularButton 
                    sendAction={() => {

                        //want to pull up a text box here, that will allow the user to type in the name for a new
                        //category, maybe list pre-existing categories beneath d 
                        setNewCategoryModal(true)
                    }} 
                    text={"New Category"} color={"#fdfdff"} bgColor={"#7f96ff"} 
                    height={48} 
                    width={240}
                    animateHeight={44}
                    animateWidth={232}
                    size={20} 
                    radius={4}
                    />
                    <FlatList
                            style={{width:"100%", marginTop:20}}
                                data={savedExpenseItem}
                                keyExtractor={item => item[1].toString()}
                                ItemSeparatorComponent={renderSeparator}
                                renderItem={({item, index}) => (
                                    <CategoriseExpenseFactory 
                                    itemData={item}
                                    sendClickAction={sendHighlightCategoriseItem}
                                    />
                                )}
                                />
                        <View style={{width:"100%",flexDirection:"row", backgroundColor:"transparent", justifyContent:"space-between"}}>
                            <FactoryCircularButton sendAction={() => {setIsConfirmedExpense(false)}} icon={"arrow-back"} size={24} color={"#fdfdff"} bgColor={"#7f96ff"} height={48} width={48} animateHeight={40} animateWidth={40} radius={1000} shadow={true}/>
                            <FactoryCircularButton 
                            sendAction={() => {}} 
                            text={highlightedCategoriseItem.length === 0 ? "Select at least 1 item":"Select category"} 
                            color={highlightedCategoriseItem.length === 0 ? "#f9f9f9":"#fdfdff"} 
                            bgColor={highlightedCategoriseItem.length === 0 ? "#e2e2e2":"#7f96ff"} 
                            height={48} 
                            width={240}
                            animateHeight={highlightedCategoriseItem.length === 0 ? 48 : 44}
                            animateWidth={highlightedCategoriseItem.length === 0 ? 240 : 232}
                            size={20} 
                            radius={4}
                            shadow={highlightedCategoriseItem.length === 0 ? false  : true}
                            />
                            {/* Will need to check that all items have been added to a category, if there are unadded items, maybe display a message saying they will be added to a misc category? */}
                            <FactoryCircularButton sendAction={confirmCatgegorisedItems} icon={"checkmark-done"} size={24} color={"#fdfdff"} bgColor={"#7f96ff"} height={48} width={48} animateHeight={40} animateWidth={40} radius={1000} shadow={true}/>
                        </View>
                        </>
                    }
                   </View>
                    </>
                    :
                    <>
                    
                    <View style={{flex:1}}>
                            <AddAndConfirmExpense sendItem={sendExpenseItemLower} />
                            <View>
                            <FlatList
                                data={savedExpenseItem}
                                keyExtractor={item => item[1].toString()}
                                ItemSeparatorComponent={renderSeparator}
                                renderItem={({item, index}) => (
                                    <PendingExpenseFactory 
                                    itemData={item}
                                    sendClickAction={sendFactoryDeleteAction}
                                    />
                                )}
                                />
                            </View>
                    </View>
                    <View style={styles.confirmPendingContainer}>
                        <FactoryCircularButton sendAction={confirmPendingItems} icon={"checkmark-done"} size={24} color={savedExpenseItem.length === 0 ? "#f9f9f9":"#fdfdff"} bgColor={savedExpenseItem.length === 0 ? "#e2e2e2" : "#7f96ff"} height={48} width={48} animateHeight={savedExpenseItem.length === 0 ? 48 :32} animateWidth={savedExpenseItem.length === 0 ? 48 :32} radius={1000} shadow={savedExpenseItem.length === 0 ? false : true}/>
                    </View>
                                
                
                </>
                }
                </View>
            </Modal>
            </GestureRecognizer>
            
            </ScrollView >
        </SafeAreaView>

    </>
    )
}


const renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#ddd",
          flex:1
        }}
      />
    );
  };

const styles = StyleSheet.create({
    shadowProp: {
        // backgroundColor:"red",
        // flex:1,
        shadowColor:"red",
        // shadowColor: '#353935',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
    banner: {
        backgroundColor:"#29339b",//"transparent",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        // paddingVertical:10
        paddingBottom:20
    },
    bannerText:{
        color:"#fdfdff",
        fontSize:24
    },
    mainViewContainer:{
        flex:1,
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
        shadowColor:"353935",
       
        paddingLeft:"5%",
        paddingRight:"5%",
        paddingBottom:"5%"
        
    },
    confirmPendingContainer:{
        backgroundColor:"transparent",
        flex:0,
        flexDirection:"row",
        justifyContent:"flex-end",
        alignSelf:"flex-end"
    },
    confirmPendingButton:{
        backgroundColor:"#7f96ff",
        borderRadius:1000,
        height:48,
        width:48,
        justifyContent:"center",
        alignItems:"center",
    },
    expenseConfirmedContainer:{
        flex:1,
        alignItems:"center",
       
    }
    
});



export default ManualEntry          