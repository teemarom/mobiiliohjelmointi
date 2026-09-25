import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const database = getDatabase(app);

type Product = {
    id?: string;
    title: string;
    amount: string;
}


export default function Firebase() {


    const [product, setProduct] = useState<Product>({
        title: "",
        amount: ""
    });
    const [items, setItems] = useState<Product[]>([]);

    const handleSave = () => {
        if (product.amount && product.title) {
            push(ref(database, 'items/'), product);
        }
        else {
            Alert.alert("Error", "Type product and amount first")
        }
    }

    const handleDelete = (id: string) => {
        remove(ref(database, `items/${id}`))
    }

    useEffect(() => {
        return onValue(ref(database, 'items/'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setItems(
                    Object.entries(data).map(([id, product]) => ({
                        id,
                        ...(product as Omit<Product, 'id'>)
                    }))
                );
                setProduct({ title: "", amount: "" })
            } else {
                setItems([]);
            }
        });
    }, []);


    return (
        <View style={styles.ruutu}>
            <Text style={{fontSize: 24, textDecorationLine:"underline"}}>FIREBASE TIETOKANTA</Text>
            <TextInput style={styles.textInput}
                placeholder=" Product title.."
                onChangeText={text => setProduct({ ...product, title: text })}
                value={product.title} />
            <TextInput style={styles.textInput}
                placeholder=" Amount.."
                onChangeText={text => setProduct({ ...product, amount: text })}
                value={product.amount} />
            <Pressable style={styles.saveButton}
                onPress={handleSave}
            >
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <FlatList //style={styles.flatlist}
                data={items}

                renderItem={({ item }) =>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.flatlistItem}>{item.title},</Text>
                        <Text style={styles.flatlistItem}>{item.amount}</Text>
                        <Text style={{ color: '#ff0000', fontSize: 18 }} onPress={() => handleDelete(item.id!)}>DELETE</Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ruutu: {
        justifyContent: 'flex-start',
        paddingTop: 150,
        alignItems: "center"
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
        marginRight: 5
    }
});