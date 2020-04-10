//building our own button
import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback,TouchableOpacity, Platform } from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => {
    //only capital character can be used as jsx code elements
    let ButtonComponent = TouchableOpacity;

    //using Platform in if conditions to change components
    if(Platform.OS === 'android' && Platform.Version >= 21)
        ButtonComponent = TouchableNativeFeedback;
    return (
        //props.onPress forwards to the component that we actually want to use the button
        //props.children gets everything that is in between the openning and closing tags
        //the view will fix the border radius in case it's running on an android device
        <View style={styles.buttonContainer}>
        <ButtonComponent onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </ButtonComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius: 25,
        overflow: 'hidden' //in case any child component that would go beyond the   
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    text: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MainButton;