import { View, Text, Animated, StyleSheet, Easing } from 'react-native'
import {useEffect, useRef} from 'react'
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';

const LoadingScreen = () => {
    const spinAnim = useRef(new Animated.Value(0)).current;
    Animated.loop(
        Animated.timing(
            spinAnim, 
                {
                toValue:1, 
                duration:2000,
                easing:Easing.bounce,
                useNativeDriver:true,
        }
        )).start();

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    
    return (
    <View style={styles.viewContainer}>
        <Animated.View style={
            {
                transform:[
                    {
                        rotate:spin
                    }
                ]
        }
        }>
            <Fontisto name="circle-o-notch" size={40} color="#fdfdff" />
      </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
    viewContainer: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
        backgroundColor:"#29339b"},
})

export default LoadingScreen