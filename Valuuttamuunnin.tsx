import { useState } from "react";
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View, } from "react-native";

import { Picker } from '@expo/ui/community/picker';

type Valuutta = {
    label: string;
    value: string;
}

const valuutat: Valuutta[] = [
    { label: "US Dollar (USD)", value: "USD" },
    { label: "British Pound (GBP)", value: "GBP" },
    { label: "Japanese Yen (JPY)", value: "JPY" },
    { label: "Brazilian Real (BRL)", value: "BRL" },
    { label: "Bitcoin (BTC)", value: "BTC" }
]

export default function Valuuttamuunnin() {

    const [rahasumma, setRahasumma] = useState("")
    const [kohdeValuutta, setKohdeValuutta] = useState("USD")
    const [tulos, setTulos] = useState("")
    const [loading, setLoading] = useState(false)

    const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

    const muunnaValuutta = async () => {
        setLoading(true)
        try {
            const response = await fetch(
                `https://api.apilayer.com/exchangerates_data/convert?to=${kohdeValuutta}&from=EUR&amount=${rahasumma}`,
                {
                    method: "GET",
                    headers: {
                        apikey: API_KEY ?? ""
                    }
                }
            );
            
            const data = await response.json();
            
            //console.log(data)
            setTulos(data.result.toString());
        } finally {
            setLoading(false)
        }

    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Pressable
                onPress={Keyboard.dismiss}
            >
                <Image style={styles.image}
                    source={{uri: 'https://m.media-amazon.com/images/I/510WmeXkLXL.png'}}
                />
                <View >
                   { loading ? 
                    <ActivityIndicator size="large" />
                    :
                    <Text style={styles.tulos}> {tulos} </Text>
                   }
                    <TextInput
                        style={styles.input}
                        onChangeText={setRahasumma}
                        value={rahasumma}
                        placeholder="Enter € to convert.."
                        keyboardType="decimal-pad"
                    />
                    <Picker
                        selectedValue={kohdeValuutta}
                        onValueChange={(value: string) => setKohdeValuutta(value)}
                    >
                        {valuutat.map((item: Valuutta) => (
                            <Picker.Item
                                key={item.value}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </Picker>
                    <Pressable style={styles.convert} onPress={muunnaValuutta}>
                        <Text style={styles.convertText}>CONVERT</Text>
                    </Pressable>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        width: 240,
        height: 35,
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    convert: {
        height: 50,
        backgroundColor: "#4287f5",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    convertText: {
        color: "white",
        fontSize: 24
    },
    container: {
        flex: 1,
        paddingTop: 250,
    },
    tulos: {
        fontSize: 36,
        alignSelf: "center",
        margin: 10
    },
    image: {
        width:200, 
        height:200,
        alignSelf: "center",
    }
});