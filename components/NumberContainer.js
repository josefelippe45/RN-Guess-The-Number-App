import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Number = props => {
    //selectedNumber doesn't exists here so we pass props.children
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.secondary,
        padding: 10,
        borderRadius: 10, //to have rounded corners
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    //the number text
    number:{
        color: Colors.secondary,
        fontSize: 22
    }
});

export default Number;