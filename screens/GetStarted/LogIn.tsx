import AnimatedImage from "../../components/signup/AnimatedLogoComponent"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginExistingAccount from "../../firebase/authFunctions/loginEmailPassword";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./GetStarted";
import { useUserContext } from "../../hooks/useUserContext";
import { authSess } from "../../firebase/firebaseConfig";

type LogInProps = NativeStackScreenProps<AuthStackParamList, "LogIn">;
const LogIn:React.FC<LogInProps> = (props) => {

  const {isLoggedIn, setIsLoggedIn, auth, setAuth} =  useUserContext()

  

    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');

    const [dimensions, setDimenstions] = useState({
      window: windowDimensions,
      screen: screenDimensions
    });

    useEffect(() => {
      //maybe need to check here
      console.log("in login")

      //will add event listener when the screen loads
      Dimensions.addEventListener(
        "change",
        ({window, screen}) => {
          setDimenstions({window, screen});
        },
        );

    }, [])
    
    const [authError, setAuthError] = useState<undefined | string>(undefined);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);


    const onChangeEmail = (text: string) => {
      setEmail(text);
      let re = /\S+@\S+\.\S+/;
      let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

      if (re.test(text) || regex.test(text)) {
          setValidEmail(true);
      } else {
          setValidEmail(false);
      }
    }

    const onChangePassword = (text: string) => {
      setPassword(text);
      //just to reset the box after attempting login with empty password
      setValidPassword(true);
    }
    

    const onLoginPress = () => {
      setAuthError(undefined); //want to reset the previous error on retries, if the email is the same

      if (password === "") {
        setValidPassword(false);
        return
      }
      LoginExistingAccount(email, password)
      .then((authResponse) => {
        if (authResponse.error) {
          setAuthError(authResponse.errorCode)
          return
        }
        
        setIsLoggedIn(true);
        
        return 
      })
      .catch((err) => {console.log(err)})
    }
    const onFooterLinkPress = () => {
       props.navigation.push("SignUp")
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
            contentContainerStyle={{flex:1}}
                style={{ width: '100%',flex:1}}
                >
                <AnimatedImage screenHeight={dimensions.screen.height} screenWidth={dimensions.screen.width} />
                <TextInput
                    style={validEmail ? [styles.input,{borderWidth:0.2}] : [styles.input, {borderWidth:1.5 , borderColor:"red"} ]}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => onChangeEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={validPassword ? [styles.input,{borderWidth:0.2}] : [styles.input, {borderWidth:1.5 , borderColor:"red"} ]}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => onChangePassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                {
                authError === undefined 
                ? <></> 
                : 
                    <Text style={styles.authErrorAlert}>Error: {authError}</Text>
                }
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
    };
    const styles = StyleSheet.create({
      authErrorAlert:{
        color:"red",
        textAlign:"center",
        fontWeight:"500"
    },
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent:"center",
          height:"100%",
          backgroundColor:"#fdfdff"
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
      footerView: {
          flex: 1,
          alignItems: "center",
          marginTop: 20
      },
      footerText: {
          fontSize: 16,
          color: '#2e2e2d'
      },
      footerLink: {
          color: "#7f96ff",
          fontWeight: "bold",
          fontSize: 16
      }
  })
export default LogIn