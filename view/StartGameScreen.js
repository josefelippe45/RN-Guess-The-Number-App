import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState();
    //manages the 'has the user confirmed yet ?'
    const [confirmed, setConfirmed] = useState(false);
    //manages the selected number
    const [selectedNumber, setSelectedNumber] = useState();
    //using state to listen to orientation changes
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);


    const numberInputHandler = inputText => {
        //the replace() is our way to validate the data entering on our inputText
        //replacing anything that's not a number from 0 to 9 the g means globally
        //so it will not take just the first hit, we will replace that with an empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }
        //this listener fires whenever the dimensions change
        //the function updateLayout doesn't have parenteses 'cause we're just pointing the function
        //so it's called for us when the dimensions change
        Dimensions.addEventListener('change', updateLayout)
        //clean up function which runs right before the useEffect runs
        return(()=>{
            //clean the listener and set up a new one and adds another one whenever our component rerenders
            Dimensions.removeEventListener('change', updateLayout);
        });
    });
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        //validating the chosenNumber 
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                title = "Invalid Number",
                message = "Number has to be a number between 1 and 99",
                [{ text: 'Okay', style: 'default', onPress: resetInputHandler }])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }
    //feedback
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput =
            <Card style={styles.start}>
                <BodyText>You Selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)} >Start Game</MainButton>
            </Card>
    }

    return (
        //in onPress we want to dismiss the keyboard
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <TitleText>Start a New Game</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Type a Number</BodyText>
                            <Input style={styles.input} blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.secondary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, //in this case it will take all the available space bellow the header.
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15 //having some space on the left and the right
    },
    inputContainer: {
        width: '80%', //it tries to take 80% but if we have a super small screen we get 300 instead. but never more than 95%
        maxWidth: '95%', //add some reponsible if the device is too small
        minWidth: 300,  //add some reponsible if the device is too small
        alignItems: 'center', //center itens horizontaly
    },
    // button: {
    //     //width: 100
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    start: {

        padding: 20,
        alignItems: 'center',
        margin: 20,

    }
});

export default StartGameScreen; 