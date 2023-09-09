import { View,  StyleSheet, TouchableOpacity, Text, TextInput, Dimensions } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from "react"
import Ionicons from '@expo/vector-icons/AntDesign'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./GetStarted";
import { useUserContext } from "../../hooks/useUserContext";
import SignUpAccount from "../../firebase/authFunctions/signUpAccount";
type SignUpProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;


const SignUp:React.FC<SignUpProps> = (props) => {

    const {isLoggedIn, setIsLoggedIn} =  useUserContext()


    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');

    const [dimensions, setDimenstions] = useState({
      window: windowDimensions,
      screen: screenDimensions
    });

    useEffect(() => {
      //will add event listener when the screen loads
      Dimensions.addEventListener(
        "change",
        ({window, screen}) => {
          setDimenstions({window, screen});
        },
        );
    }, []);

    const [authError, setAuthError] = useState<undefined | string>(undefined);

    
    const [fname, setfname] = useState("");
    const [validFname, setValidFname] = useState(true);

    const [lname, setlname] = useState("");
    const [validLname, setValidLname] = useState(true);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);

    const [seePassword, setSeePassword] = useState(true);

    const onChangeFname = (text: string) => {
        setfname(text);
        //will just remove red user alert beneath the textbox
        setValidFname(true);
    }

    const onChangeLname = (text: string) => {
        setlname(text);
        //will just remove red user alert beneath the textbox
        setValidLname(true);
    }

    const onChangeEmail = (text: string) => {
        setEmail(text);
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (re.test(text) || regex.test(text)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
        //will need addtional checking here
    }
    const checkPassword = (text: string): string => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(password)) {
            return 'Password must not contain Whitespaces.';
        }
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(password)) {
            return 'Password must have at least one Uppercase Character.';
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(password)) {
          return 'Password must have at least one Lowercase Character.';
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(password)) {
          return 'Password must contain at least one Digit.';
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(password)) {
          return 'Password must be 8-16 Characters Long.';
        }

        //will need addtional checking here
        setValidPassword(true);
        return ""
        
    }


    const onCreateAccount = () => {
        setAuthError(undefined); //want to reset the previous error on retries, if the email is the same
        //then they will be notified again
        let flag = false;
        if (!(validFname && validLname && validEmail && validPassword)) {
            flag = true;
        };
        if (fname.trim() === "") {
            //inform user that name is invalid
            setValidFname(false)
            flag = true;
        }
        if (lname.trim() === "") {
            //inform user that name is invalid
            setValidLname(false)
            flag = true;
        }
        if (email.trim() === "" ) {
            //inform user that name is invalid
            setValidEmail(false)
            flag = true;
        }
        if (password.trim() === "") {
            //inform user that name is invalid
            setValidPassword(false)
            flag = true;
        }
        const invalidPasswordMessage = checkPassword(password);
        if (invalidPasswordMessage !== "") {
            alert(invalidPasswordMessage);
            flag = true;
        }
        if (flag) {
            console.log("account failed")
            return
        };


        SignUpAccount(email, password, fname, lname)
        .then((response) => {
            if (response.error) {
                setAuthError(response.errorCode);
                return;
            };
            setIsLoggedIn(true);
            return;
        })
        .catch((err)=>{console.log(err)});
    }


    return (
        <>
          <SafeAreaView
            edges={["top"]}
            style={{ flex: 0, backgroundColor: "#29339b" }}
            />

            <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{
              flex: 1,
              backgroundColor: "#fff",
              position: "relative",
            }}>
            {/* Banner */}
            <View style={styles.banner}>
                <TouchableOpacity style={{position:"absolute", left:20}} >
                    <Ionicons name="left" size={32} color="#fdfdff" onPress={()=> props.navigation.pop()}/>
                </TouchableOpacity>
                <Text style={styles.bannerText}>Create Account</Text>
                
                {/* End Banner */}
            </View>
        {/* Sign Up Body */}



        <KeyboardAwareScrollView style={{paddingTop:"20%" ,backgroundColor:"#fdfdff", height:"100%" }} enableOnAndroid={true}>   
                <TextInput
                    style={validFname ? [styles.input,{borderWidth:0.2}] : [styles.input, {borderWidth:2 , borderColor:"red"} ]}
                    placeholder='First Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => {onChangeFname(text)}}
                    value={fname}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {validFname ? <></> : <Text style={styles.invalidTextAlert}>Invalid First Name</Text>}
                {/* lname */}
                <TextInput
                    style={validLname ? [styles.input,{borderWidth:0.2}] : [styles.input, {borderWidth:2 , borderColor:"red"} ]}
                    placeholder='Last Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => onChangeLname(text)}
                    value={lname}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 {validLname ? <></> : <Text style={styles.invalidTextAlert}>Invalid Last Name</Text>}
                <TextInput
                    style={validEmail ? [styles.input,{borderWidth:0.2}] : [styles.input, {borderWidth:2 , borderColor:"red"} ]}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => onChangeEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                />
                {validEmail ? <></> : <Text style={styles.invalidTextAlert}>Invalid Email</Text>}

                <TextInput
                    style={validPassword ? [styles.input,{borderWidth:0.2}] : [styles.input, {borderWidth:2 , borderColor:"red"} ]}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={seePassword}
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {validPassword ? <></> : <Text style={styles.invalidTextAlert}>Password Not Strong Enough</Text>}

                <View style={{ marginLeft:30, flexDirection:"row"}}>
                    <Checkbox style={styles.checkboxStyling} disabled={false} value={!seePassword} onValueChange={() => setSeePassword(!seePassword)} color={!seePassword ? '#29339b' : undefined} />
                    <Text>Show Password</Text>
                </View>
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onCreateAccount()}>
                    <Text style={styles.buttonTitle}>Create Account</Text>
                </TouchableOpacity>
                {
                authError === undefined 
                ? <></> 
                : 
                    <Text style={styles.authErrorAlert}>Error: {authError}</Text>
                }

            </KeyboardAwareScrollView>
        </SafeAreaView>
        {/* </View> */}
        </>
        
    )
};
//probably need to position the back button over the banner absolutely
//so that it will not push the text to the right when placed on the same horizontal axis
const styles = StyleSheet.create({

    authErrorAlert:{
        color:"red",
        textAlign:"center",
        fontWeight:"500"
    },

    invalidTextAlert:{
        color:"red",
        marginLeft:30
    },

    banner: {
        backgroundColor:"#29339b",//"transparent",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        paddingVertical:10,
        // textAlign:"center"
        flexWrap:"wrap",
        alignContent:"stretch"
    },
    bannerText:{
        color:"#fdfdff",
        fontSize:24
    },
    backButtonView:{
        position:"absolute",
        paddingTop:15,
    },

    checkboxStyling:{
        marginRight:10
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
    },
    button: {
        backgroundColor: '#7f96ff',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})

export default SignUp;
