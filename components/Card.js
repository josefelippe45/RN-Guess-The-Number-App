import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props =>{
    return(
        <View style = {{...styles.card, ...props.style}}>{props.children}</View>
        /**
         * the ... is the spread operator
         * wich pulls all the key-values pairs of an object out of that object and adds to a new surrounding object
         * so we copy all the styles down there and put into this new object
         * the second ste of key-value pairs takes all the styles defined in props styles and merge into this object.
         * this will overwrite any key-value pairs set up in ...styles.card, so we can overwrite any style in the StyleSheet card
         * from outside when we use our component and when we add adittional components it will also merge. with that we can
         * also asign our own styles from outside of the card component when we use it
        */
    )
};

const styles = StyleSheet.create({
    card:{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, // only works with android
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10 //sets rouded borders
    }
});

export default Card;