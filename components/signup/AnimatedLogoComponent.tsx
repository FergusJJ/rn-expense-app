import React, { useState, useEffect } from 'react';
import { Image, Animated, View, Text, StyleSheet } from 'react-native';
import { screenProps } from '../../types/types';


const AnimatedImage:React.FC<screenProps> = ( props ) => {
    const pt = props.screenHeight / 5
    const [animation] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation, {
            toValue: -40,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, []);

    const imageStyle = {
        height:props.screenHeight/15,
        width:props.screenHeight/2.5,
        justifyContent:"center" as "center",
        position:"absolute" as "absolute",
        alignSelf:"center" as "center",
        transform: [
            {
                translateY:animation
            }
        ],
        
    };
    const styles = StyleSheet.create({
        ViewContainer:{
            width:"100%",
            flex:1,
            justifyContent:"center",
            alignContent:"center"
        },
        WelcomeText: {
            textAlign:"center",
            paddingTop:pt,
            fontWeight:"bold",
            fontSize:24,
            color:"#7f96ff"
            
        }
    })
    return (
        <View style={styles.ViewContainer}>
            <Animated.Image
                source={require('../../assets/images/placeholder.png')}
                style={imageStyle}
            />
            <Text style={styles.WelcomeText}>Welcome Back!</Text>
        </View>
    );
};



export default AnimatedImage;