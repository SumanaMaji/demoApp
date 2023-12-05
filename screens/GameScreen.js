import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import Title from "../components/game/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/game/ui/PrimaryButton";
import Card from "../components/game/ui/Card";
import InstructionText from "../components/game/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, elclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === elclude) {
    return generateRandomBetween(min, max, elclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentguess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentguess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentguess, userNumber, onGameOver]);

  useEffect(() => {
    (minBoundary = 1), (maxBoundary = 100);
  }, []);

  function nextGuessNumber(direction) {
    // direction => 'lower', 'greater'
    if (
      (direction === "lower" && currentguess < userNumber) ||
      (direction === "greater" && currentguess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentguess - 1;
    } else {
      minBoundary = currentguess + 1;
    }
    const newrndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentguess
    );
    setCurrentGuess(newrndNumber);
    setGuessRounds((prevGuessRounds) => [newrndNumber, ...prevGuessRounds]);
  }
  const guessRoundListLength = guessRounds.length;

  let content = (<>  
  <NumberContainer>{currentguess}</NumberContainer>
  <Card>
    <InstructionText style={styles.instructionText}>
      Higer or lower
    </InstructionText>
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={nextGuessNumber.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </PrimaryButton>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={nextGuessNumber.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </PrimaryButton>
      </View>
    </View>
  </Card>
  </>);

if(width > 500){
  content = (<>
    <InstructionText style={styles.instructionText}>
      Higer or lower
    </InstructionText>
    <View style={styles.buttonsContainerWide}>
    <View style={styles.buttonContainer}>
        <PrimaryButton onPress={nextGuessNumber.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </PrimaryButton>
      </View>    
    <NumberContainer>{currentguess}</NumberContainer>
    <View style={styles.buttonContainer}>
        <PrimaryButton onPress={nextGuessNumber.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </PrimaryButton>
      </View>
    </View>
  
  </>);
}
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}> 
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}
export default GameScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems:'center'
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer:{
    flex:1,
    padding: 16,
  },
  buttonsContainerWide:{
    flexDirection:'row',
    alignItems:'center',
  }
});
