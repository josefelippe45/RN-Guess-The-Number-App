import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
    //we use that require sintax to be able to style the image. resizeMode keep the aspect ratio
    //<Text> inside of <Text> receives the style defined on the other <Text>
    return (
        <View style={styles.screen}>
            <TitleText> The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image //source={require('../assets/success.png')} from local images
                    source={{ uri: 'https://image.freepik.com/free-vector/you-win-sign-pop-art-style_175838-499.jpg' }}
                    style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Number of Rounds: <Text style={styles.highlight}>{props.roundsNumber}. </Text>
                    Number you selected: <Text style={styles.highlight}> {props.userNumber}.</Text>
                </BodyText>
            </View>


            <MainButton onPress={props.onRestart}>New Game</MainButton>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        /**
         * to have a perfect circle we add a 'square' with both width a height equals
         * then whe set the borderRadius to be half of that.
         */
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        //hiddens any of the childs inside of the container that are exceding the boundaries and cut it off
        overflow: 'hidden',
        marginVertical: 20
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        

    },
    resultContainer: {
        width: '80%',
        marginHorizontal: 30,
        marginVertical: 20
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default GameOverScreen;