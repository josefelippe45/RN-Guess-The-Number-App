import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = props => <Text style={{...styles.title, ...props.style}}>{props.children}</Text>

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginVertical: 10, //adding some space on the vertical X
        fontFamily: 'open-sans-bold' //gets the font that we previously loaded in app.js
    }
});

export default TitleText; 