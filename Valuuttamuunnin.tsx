import { useState } from "react";
import { StyleSheet, Text, TextInput, View, } from "react-native";


export default function Valuuttamuunnin() {

    const [rahasumma, setRahasumma] = useState("")


    return (
        <View >
            <TextInput
                style={styles.input}
                onChangeText={setRahasumma}
                value={rahasumma}
                placeholder="Enter amount to convert"
                keyboardType="decimal-pad"
            />
        </View>
    )   

}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: 180,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});