import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as sqlite from 'expo-sqlite';

type Ostos = {
    id: number;
    product: string;
    amount: string;
}
const db = sqlite.openDatabaseSync('ostosdb')

export default function SQLite() {

    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [ostokset, setOstokset] = useState<Ostos[]>([]);


    const handleSave = async () => {
        try {
            await db.runAsync(`INSERT INTO ostos (product, amount) VALUES (?, ?)`, product, amount);
            setProduct("")
            setAmount("")
            handleFetch()
        } catch (error) {
            console.error("Could not add item", error)
        }
    };

    const handleFetch = async () => {
        try {
            const list = await db.getAllAsync(`SELECT * FROM ostos`);
            setOstokset(list as Ostos[]);
        } catch (error) {
            console.error("Could not get items", error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await db.runAsync('DELETE FROM ostos WHERE id=?', id);
            await handleFetch();
        } catch (error) {
            console.error("Could not delete item", error)
        }
    }

    const initialize = async () => {
        try {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS ostos (
                    id INTEGER PRIMARY KEY,
                    product TEXT NOT NULL,
                    amount TEXT NOT NULL
                    );
                `);
        } catch (error) {
            console.error("Could not open database", error);
        }
    }

    useEffect(() => {
        initialize(),
        handleFetch()
    }, []);

    return (
        <View style={styles.ruutu}>
            <TextInput style={styles.textInput}
                placeholder=" Product.."
                onChangeText={product => setProduct(product)}
                value={product} />
            <TextInput style={styles.textInput}
                placeholder=" Amount.."
                onChangeText={amount => setAmount(amount)}
                value={amount} />
            <Pressable style={styles.saveButton}
                onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <FlatList //style={styles.flatlist}
                data={ostokset}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.flatlistItem}>{item.product},</Text>
                        <Text style={styles.flatlistItem}>{item.amount}</Text>
                        <Text style={{ color: '#ff0000', fontSize: 18 }} onPress={() => handleDelete(item.id)}>DELETE</Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ruutu: {
        justifyContent: 'flex-start',
        paddingTop: 150
    },
    textInput: {
        borderWidth: 1,
        borderColor: "black",
        height: 40,
        width: 200,
        margin: 5,
        borderRadius: 8
    },
    saveButton: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 60,
        backgroundColor: "#0cabf0",
        borderRadius: 5,
        margin: 5
    },
    buttonText: {
        fontSize: 16,
        color: "white"
    },
    /*flatlist: {
        borderWidth: 1,
        borderColor: "black",
    },
    */
    flatlistItem: {
        fontSize: 18,
        marginRight:5
    }
});