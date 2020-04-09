import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
   
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
 
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
    };
 
    Dimensions.addEventListener('change', updateLayout);
 
    return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });
    //<Text> inside of <Text> receives the style defined on the other <Text>
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText> The Game is Over!</TitleText>
                <View style ={{...styles.imageContainer, ...{
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: (availableDeviceWidth * 0.7) / 2,
                    marginVertical: availableDeviceHeight / 30
                }}}>
                {/* <View style={‌{...styles.imageContainer, ...{
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: (availableDeviceWidth * 0.7) / 2,
                    marginVertical: availableDeviceHeight / 30
                }}}>     */}
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
        </ScrollView>
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
        //                                    CHANGED TO INLINE STYLES
        // /**
        //  * to have a perfect circle we add a 'square' with both width a height equals
        //  * then whe set the borderRadius to be half of that.
        //  */
        // width: Dimensions.get('window').width * 0.7, // 70% percent of the available width
        // height: Dimensions.get('window').width * 0.7,
        // borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        //hiddens any of the childs inside of the container that are exceding the boundaries and cut it off
        overflow: 'hidden',
        //marginVertical: Dimensions.get('window').height / 30
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
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;