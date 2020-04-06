import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
//using icons
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';


const generateRandomBetween = (min, max, exclude) => {
    //returns the minor integer number greater or equal to min. it round up the number if it's not a integer
    min = Math.ceil(min);
    //does the same but rounded down
    max = Math.floor(max);
    //this will gives us a random number between min and max
    const rndNumber = Math.floor(Math.random() * (max - min)) + min;
    //validating that the computer doesn't show the chosen number for the first time
    if (rndNumber === exclude)
        //adding recursive properties  
        return generateRandomBetween(min, max, exclude)
    else
        return rndNumber;

}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        {/**
         * itemData is an object which also has an index propertie which is the index of the item
         * we are outputting
         */}
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    //manages the list os guesses that the computer takes, starting with the first 
    //we use toString here to be able to pass this to our flat list
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    //using useRef() to help adjusting the min and max values with the hints the user is giving
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    /**using object destructuring to destructure the props and get userChoice and onGameOver out of them
     * and we store them in const of equal name so we don't need to use 'props.' and we can use it on the
     * second parameter of the useEffect */
    const { userChoice, onGameOver } = props
    /**
     * useEffect allows us to run side effects or logic after every render cycle
     * the function we are passing runs after every render cycle
     */
    useEffect(() => {
        if (currentGuess === userChoice) {
            //returning the number of rounds the computer took.
            onGameOver(pastGuesses.length);
        }
        /**the second argument of useEffect is an array of dependecies of the function of useEffect
        * on the array we especify any value that's coming from outside of the effect function 
        * whenever such a value changes the effect will rerun and if the values of the array don't change
        * then the effect will no rerun */
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        //validation
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert(
                title = "Wrong Hint!",
                message = "You should give a valid hint",
                [{ text: 'Okay', style: 'default' }]);
            return;
        };
        //if the number is lower than the currentGuess become the 'max' value
        if (direction === 'lower') {
            //this adjusts the min and max values so the computer doesn't guess the same number twice 
            //the number that's currect can't be higher than the one that the computer guessed 
            currentHigh.current = currentGuess;
        } else {
            // the plus one here makes sure that the computer doesn't repeat the lower number
            currentLow.current = currentGuess + 1;
        }
        //the function here will be taken the values assigned in the if condition and excludes the currentGuess 
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //increments one in the numbers of rounds
        //setRounds(curRounds => curRounds + 1);
        //getting our previously guesses and adding a new one
        //we use toString here to be able to pass this to our flat list
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    };
    //the two .bind() will be used as idetifiers that are passed to the nextGuessHandler
    /**
     * the index inside of the <ScrollView> is the numOfRounds. When we do pastGuess.length - index
     * we get the correct number of the round 'cause it's been add above the past round.
     */
    return (
        <View style={styles.screen}>
            <TitleText>Computer's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>

                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/**<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>*/}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    /**
                     * bind arguments that should be passed in. this, as the first argument, should refer to the 
                     * function we are calling, pastGuesses.length will be use as our number of rounds
                     */
                    renderItem={renderListItem.bind(this, pastGuesses.length)} 
                    contentContainerStyle={styles.list}
                    />

            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 300,
        maxWidth: '80%',
        justifyContent: 'space-between',
        marginHorizontal: 15

    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 15,
        width: '80%' //so it will be 80% of the parent it's inside

    },
    listContainer: {
        flex: 1, //to the scrollview nested on a view works on android it need to have flex: 1.
        width: '60%'
    },
    //styling inside of our scroll view
    list: {
        flexGrow: 1, //a bit more flexible than flex
        alignItems: 'center',
        //allows us to position content along the main axis of the flexbox and it's by default the vertical axis
        justifyContent: 'flex-end' //so it will begin in the bottom of the screen

    }
});

export default GameScreen;