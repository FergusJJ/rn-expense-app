import { View, StyleSheet, Text, TextInput, Platform } from "react-native"
import { useState } from "react";
import FactoryCircularButton from "../../factoryComponents/factoryCircularButton";
import { saveNewCategoryToFirestore } from "../../../firebase/firestore/Categories";
import { useUserContext } from "../../../hooks/useUserContext";
import { Colors, ExpenseCategoryStruct, FirebaseSaveCategoryResponse } from "../../../types/types";
import { useUserDataContext } from "../../../hooks/useUserDataContextProvider";
import { Timestamp } from "firebase/firestore";
type Props = {
    existingCategories: Array<[string,ExpenseCategoryStruct]>;
    reopenPreviousModal: () => void;
    uid: string;
    updateExistingCategories: (newCategory: [string, ExpenseCategoryStruct]) => void;
}

const generateBoxShadowStyle = (
    xOffset: number,
    yOffset: number,
    shadowColorIos: string,
    shadowOpacity: number,
    shadowRadius: number,
    elevation: number,
    shadowColorAndroid: string,
    
  ) => {
    if (Platform.OS === 'ios') {
      styles.iosShadow = {
        shadowColor: shadowColorIos,
        shadowOffset: {width: xOffset, height: yOffset},
        shadowOpacity,
        shadowRadius,
      };
      styles.androidShadow = {};
    } else if (Platform.OS === 'android') {
      styles.androidShadow = {
        elevation,
        shadowColor: shadowColorAndroid,
      };
      styles.iosShadow = {}
    }
  };

const EnterNewCategory:React.FC<Props> = ({existingCategories, reopenPreviousModal, uid, updateExistingCategories}) => {
    generateBoxShadowStyle(
        1, 1, "#353935", 0.5, 4, 20, "#353935"
      )

    const {auth} = useUserContext();
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>("");
    const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    //Here want to assign one of the 12 colors that are in types.ts
    //Will need to make sure beforehand that the color that is picked is not already in use from another
    //category
    //Could do this by loading the current categories with colors once the user is logged in
    //This is going to be stored in context, then can refer to the context to check on creation of category

    const handleAddNewCategory = (name: string) => {
      
      const usedColors = existingCategories.map((val) => {
        console.log(existingCategories)
        return val[1].color
      }
        );
      let tempColors = Colors.filter(color => !usedColors.includes(color));
      let currentNames = existingCategories.map((val) => val[1].categoryName);
      if (currentNames.includes(categoryName)) {
        setErrorMessage("category name is already in use");
        setIsErrorMessage(true);
        return;
      }
      const color = tempColors[Math.floor(Math.random()*tempColors.length)];
      // console.log(tempColors);

      const asyncWrap = async () => {
          const ts = Timestamp.now()
          const docId = await saveNewCategoryToFirestore(uid, name, color, ts).then(
              ({success, errorMessage, docId}: FirebaseSaveCategoryResponse) => {
                  setIsErrorMessage(!success);
                  setErrorMessage(errorMessage);
                  return docId;
            }
          );
          if (isErrorMessage) return;
          const newCategory:ExpenseCategoryStruct = {
            createdAt:ts,
            categoryName:name,
            color:color
          };   
          updateExistingCategories([docId, newCategory]);
          console.log("in asyncWrap:",newCategory)
      };
      asyncWrap().then(() => {
        console.log("saved category to context");
      })
    

    }

    const onButtonPress = () => {
        const trimmedName = categoryName.trim();
        if (trimmedName.length === 0) return;
        // saveNewCategoryToFirestore()
        // const authObject = JSON.parse(auth); //i dont think there is any case where auth is null at this point
        // const uid:string = authObject.currentUser.uid;

        //check that color is not part of already used colors
        //also want to make sure that the category is not duplicated and overwritten
        // console.log(savedCategories)
        handleAddNewCategory(trimmedName);


    }

    return (
        <View style={styles.container}>
            <View style={isFocus || categoryName.trim().length > 0 ? [styles.inputContainer, styles.iosShadow, styles.androidShadow] : [styles.inputContainer, {borderColor:"#e2e2e2", borderWidth:1}]}>
                <TextInput
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                style={styles.textInputArea}
                placeholder='Category Name'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => {setCategoryName(text)}}
                value={categoryName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                />
                <View style={styles.verticalLine}/>
                <FactoryCircularButton 
                sendAction={onButtonPress} 
                icon={"add"} 
                size={24} 
                color={categoryName.trim().length > 0 ? "#fdfdff" : "#f9f9f9"} 
                bgColor={categoryName.trim().length > 0 ? "#7f96ff" : "#e2e2e2"} 
                height={32} width={32} animateHeight={40} animateWidth={40} radius={10} 
                extraStyles={{paddingLeft:2}}
                />
            </View>
            {isErrorMessage ? <Text style={styles.invalidTextAlert}>{errorMessage}</Text> : <></>}

        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        // backgroundColor:"red",
        flex:1,
        padding:20,
        width:"100%"
    },
    invalidTextAlert:{
        color:"red",
        marginLeft:30
    },
    inputContainer: {
        backgroundColor:"white",
        height:48,
        // borderRadius:4,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:5
    },
    verticalLine:{
        height: "60%",
        width: 1,
        backgroundColor: "#909090",
        marginHorizontal:5,
        
    },
    textInputArea:{
        marginHorizontal:20,
        fontSize:16,
        // backgroundColor:"red",
        flex:4
    },
    androidShadow:{},
    iosShadow:{}
  });

export default EnterNewCategory