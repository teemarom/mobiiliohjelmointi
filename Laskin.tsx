import { useState } from 'react';
import { Button, Keyboard, Pressable, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';

export default function Laskin() {
    const [luku1, setLuku1] = useState("");
    const [luku2, setLuku2] = useState("");
    const [vastaus, setVastaus] = useState("0");
    const [laskut, setLaskut] = useState<string[]>([]);

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
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        {/* vastaus */}
        <Text style={{fontSize:24}}>Result: {vastaus} </Text>

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
            <Button title="+" onPress={plus}/> 
            <Button title="-" onPress={miinus}/>
            <Button title="*" onPress={kerto}/>
            <Button title="/" onPress={jako}/>
        </View>
        {/* reset */}
        <Pressable onPress={reset}> 
            <Text style={styles.reset}> RESET </Text>
        </Pressable>
        
        {laskut.length > 0 &&
        (<View>
        <Text style={{textAlign: "center", fontSize:16, marginBottom: 10}}>History</Text>
        <FlatList 
            style={styles.flatlist}
            contentContainerStyle={styles.flatlistContent}
            data={laskut}
            renderItem={({item}) => <Text>{item}</Text>}
        />
        </View>)}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
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
        marginBottom: 25
    },
    flatlist:{
        height: 200,
        width: 300,
    },
    flatlistContent: {
        alignItems: "center"
    }

});