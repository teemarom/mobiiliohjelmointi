import { useState } from 'react';
import { Button, Keyboard, Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';

type LaskinProps = {
    laskut: string[];
    setLaskut: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Laskin({ laskut, setLaskut }: LaskinProps) {
    const [luku1, setLuku1] = useState("");
    const [luku2, setLuku2] = useState("");
    const [vastaus, setVastaus] = useState("0");

    const plus = () => {
        const tulos = (String(Number(luku1) + Number(luku2)))
        setVastaus(String(tulos));
        setLaskut([...laskut, `${luku1} + ${luku2} = ${tulos}`])
    };

    const miinus = () => {
        const tulos = (String(Number(luku1) - Number(luku2)))
        setVastaus(String(tulos));
        setLaskut([...laskut, `${luku1} - ${luku2} = ${tulos}`])
    };

    const kerto = () => {
        const tulos = (String(Number(luku1) * Number(luku2)))
        setVastaus(String(tulos));
        setLaskut([...laskut, `${luku1} * ${luku2} = ${tulos}`])
    }

    const jako = () => {
        const tulos = (String(Number(luku1) / Number(luku2)))
        setVastaus(String(tulos));
        setLaskut([...laskut, `${luku1} / ${luku2} = ${tulos}`])
    }

    const reset = () => {
        setLuku1("")
        setLuku2("")
        setVastaus("0")
        setLaskut([])
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                {/* vastaus */}
                <Text style={{ fontSize: 24 }}>Result: {vastaus} </Text>

                {/* luku1 */}
                <TextInput style={styles.input}
                    placeholder='luku1'
                    keyboardType='numeric'
                    value={luku1}
                    onChangeText={setLuku1}></TextInput>
                {/* luku2 */}
                <TextInput style={styles.input}
                    placeholder='luku2'
                    keyboardType='numeric'
                    value={luku2}
                    onChangeText={setLuku2}></TextInput>
                {/* painikkeet */}
                <View style={styles.buttons}>
                    <Button title="+" onPress={plus} />
                    <Button title="-" onPress={miinus} />
                    <Button title="*" onPress={kerto} />
                    <Button title="/" onPress={jako} />
                </View>
                {/* reset */}
                <Pressable onPress={reset}>
                    <Text style={styles.reset}> RESET </Text>
                </Pressable>

            </Pressable>
        </KeyboardAvoidingView>
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
        marginBottom: 25,
        backgroundColor: "red",
        color: "white"
    },
    keyboardView: {
        flex: 1,
    },


});