import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Laskin() {
    const [luku1, setLuku1] = useState("");
    const [luku2, setLuku2] = useState("");
    const [vastaus, setVastaus] = useState("0");

    const plus = () => {
        setVastaus(String(Number(luku1) + Number(luku2)));
    };

    const miinus = () => {
        setVastaus(String(Number(luku1) - Number(luku2)));
    };

    const kerto = () => {
        setVastaus(String(Number(luku1) * Number(luku2)));
    }

    const jako = () => {
        setVastaus(String(Number(luku1) / Number(luku2)));
    }

    const reset = () => {
        setLuku1("")
        setLuku2("")
        setVastaus("0")
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <Text>Result: {vastaus} </Text>
        <TextInput style={styles.input} // luku 1
            placeholder='luku1'
            keyboardType='numeric'
            value={luku1}
            onChangeText={setLuku1}></TextInput>
        <TextInput style={styles.input} // luku 2
            placeholder='luku2'
            keyboardType='numeric'
            value={luku2}
            onChangeText={setLuku2}></TextInput>
        <View style={styles.buttons}>
            <Button title="+" onPress={plus}/> 
            <Button title="-" onPress={miinus}/>
            <Button title="*" onPress={kerto}/>
            <Button title="/" onPress={jako}/>
        </View>
        <Pressable onPress={reset}>
            <Text style={styles.reset}> RESET </Text>
        </Pressable>
        <StatusBar style="auto" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
    buttons: {
        flexDirection: 'row',
        gap: 50,
        marginTop: 20,
    },
    reset: {
        marginTop: 25,
        borderWidth: 4,
        borderColor: 'red',
    },

});