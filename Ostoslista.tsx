import { useState } from "react";
import { Button, FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

export default function Ostoslista() {

    type ListItem = {
        ostos: string
    }

    const [ostos, setOstos] = useState("")
    const [lista, setLista] = useState<string[]>([])

    const addOstos = () => {
        if (ostos.trim() === "") {
            return
        }
        setLista([...lista, ostos])
        setOstos("")
    }

    const clearList = () => {
        setLista([])
        setOstos("")
    }

    const removeItem =(index:number) => {
        setLista(lista.filter((_, i) => i !== index))
    }

    return (

        <View style={styles.container}>
            {/*INPUT*/}
            <TextInput style={styles.input}
                placeholder="Add shopping item"
                onChangeText={setOstos}
                value={ostos}
            ></TextInput>

            {/*BUTTONS*/}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={addOstos}>
                    <Text style={styles.buttonText}>Add</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={clearList}>
                    <Text style={styles.buttonText}>Clear</Text>
                </Pressable>
            </View>

            {/*FLATLIST*/}
            {lista.length > 0 && (
                <View style={styles.flatlistView}>
                    <Text style={{ fontSize: 26, fontStyle: "italic" }}>Shopping List 🛒 </Text>
                    <FlatList style={styles.flatlist}
                        data={lista}
                        renderItem={({ item, index }) =>
                            <View style={{ alignItems: "center", flexDirection: "row"}}>
                                <Text style={styles.flatlisttxt}>{item}</Text>
                                    <Button onPress={() => removeItem(index)} title="🗑️"></Button>
                            </View>}>

                    </FlatList>
                </View>
            )}
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        height: 400
    },
    input: {
        borderWidth: 2,
        height: 30,
        width: 200
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 30,
        justifyContent: "center",
        marginBottom: 20
    },
    button: {
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        color: "white",
        backgroundColor: "#e66c1c"
    },
    flatlist: {
        marginTop: 20,
        width: 200,
    },
    flatlisttxt: {
        fontSize: 18,
        fontFamily: "Georgia",
    },
    flatlistView: {
        alignItems: "center"
    }

});