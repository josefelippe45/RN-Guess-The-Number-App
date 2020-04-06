//building our own button
import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => {

    return (
        //props.onPress forwards to the component that we actually want to use the button
        //props.children gets everything that is in between the openning and closing tags
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
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