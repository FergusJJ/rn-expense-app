import { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Animated} from "react-native"
import { GetStartedNavigationProps } from "../../types/types";


const AnimatedGetStartedComponent:React.FC<GetStartedNavigationProps> = (props) => {

    const [animation] = useState(new Animated.Value(0));
    let paddingSize = 10;
    let marginTop = 20;
    let fontSz = 16;
    if (props.screenHeight > 840) {
        paddingSize = 15;
        marginTop = 40; 
        fontSz = 18;
    }

    useEffect(() => {
        Animated.timing(animation, {
            toValue:1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    const animatedViewStyle = {
        padding: paddingSize,
        borderRadius: 5,
        marginTop: marginTop,
        position:"absolute" as "absolute", //use type casting to fix bug, idk whether there is a better workaround
        backgroundColor: '#fdfdff',
        transform: [
            {
                scale:animation
            }
        ]
    };

    return (            
        <Animated.View style={animatedViewStyle} >
            <TouchableOpacity style={styles.nextButton} onPress={() =>{props.navigationProp.push("SignUp")}} >
                <Text style={[styles.nextButtonText, {fontSize:fontSz}]}>Get Started</Text>
            </TouchableOpacity>
        </Animated.View>
    )
    
}
const styles = StyleSheet.create({
    nextButton: {        
        zIndex:0,
        
      },
      nextButtonText: {
        color: '#fdfdff',
        fontWeight: 'bold',
},
});
export default AnimatedGetStartedComponent;