import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
//prolongs the splash screen until a simple task of our choice is done
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './view/StartGameScreen';
import GameScreen from './view/GameScreen';
import GameOverScreen from './view/GameOverScreen';

const fetchFonts = () => {
  //load fonts
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  //managing which screen will be shown
  const [userNumber, setUserNumber] = useState();
  //manages the number of rounds the computer took to finish the game
  const [guessRounds, setGuessRounds] = useState(0);
  //manages the loaded fonts in this case we'll be using AppLoading.
  const [dataLoaded, setDataLoaded] = useState(false);
  //if dataLoaded isn't equal to true
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }


  //whenever we have a user number we know that the game is running so it must show the <GameScreen> component
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);

  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  //setting the default content
  //creating a prop to foward startGameHandler to Start Game button
  //startGameHandler doesn't have parenteses 'cause it's just a point so it's a propertie in StartGameScreen
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  //changing screens
  if (userNumber && guessRounds <= 0) {
    //here we pass the userChoice which is a prop of GameScreen and bound it to userNumber
    //passing a prop 'onGameOver' to use the gameOverHandler on the game screen
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />

  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
  }
  return (
    <SafeAreaView style={styles.screen}>
        <Header title="Guess a Number!" />
        {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1 //so it takes the whole device's available space, since it's the root view of our app 
  }
});
