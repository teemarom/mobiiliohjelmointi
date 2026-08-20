import { useState } from "react";
import { StatusBar, Text, View, TextInput, StyleSheet, Button, Pressable, Keyboard, Alert } from "react-native";



export default function Arvauspeli() {

    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1)
    const [guess, setGuess] = useState("")
    const [guessCount, setGuessCount] = useState(0)

    const makeGuess = () => {
        setGuessCount(guessCount + 1)
        if (Number(guess) > randomNumber) {
            Alert.alert("Your guess is too high")
        } else if (Number(guess) < randomNumber) {
            Alert.alert("Your guess is too low")
        } else {
            Alert.alert(`JIPPII!! You guessed the number in ${guessCount + 1} guesses`);
        }
    }

    const newGame = () => {
        Alert.alert("New Game?", "", [
            {
                text: 'OK',
                onPress: () => {
                    setRandomNumber(Math.floor(Math.random() * 100) + 1)
                    setGuessCount(0)
                    setGuess("")
                }
            },
            {
                text: 'Cancel', style: 'cancel'
            },
        ])

    }

    return (
        <View >
            <Text style={{ fontSize: 20 }}>Guess a number between 1-100</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.input}
                placeholder="Your Guess"
                value={guess}
                onChangeText={setGuess}
                maxLength={3}
            ></TextInput>
            <Pressable style={styles.pressable} onPress={makeGuess}>
                <Text style={styles.guessbutton}>MAKE GUESS</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={newGame}>
                <Text style={styles.newgame}>NEW GAME</Text>
            </Pressable>
            <StatusBar />
        </View>

    );

}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 10,
        fontSize: 18,
    },
    guessbutton: {
        fontSize: 16,
        marginTop: 15,
        borderWidth: 2,
        padding: 3,
        color: "white",
        backgroundColor: "orange",
        width: 200,
        textAlign: "center"
    },
    pressable: {
        alignItems: "center"
    },
    newgame: {
        fontSize: 16,
        marginTop: 15,
        borderWidth: 2,
        padding: 3,
        color: "white",
        backgroundColor: "teal",
        width: 200,
        textAlign: "center"
    }
});