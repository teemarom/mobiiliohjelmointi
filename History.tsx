import { FlatList, StyleSheet, Text, View } from "react-native";

type HistoryProps = {
    laskut: string[];
}

export default function History({ laskut }: HistoryProps) {
    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.heading}>Laskuhistoria</Text>
                <FlatList
                    style={styles.flatlist}
                    contentContainerStyle={styles.flatlistContent}
                    data={laskut}
                    renderItem={({ item }) => <Text style={styles.flatlistItem}>{item}</Text>}
                />
            </View>
        </View>

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
    flatlist: {
        height: 200,
        width: 300,
    },
    flatlistContent: {
        alignItems: "center",
    },
    flatlistItem: {
        fontSize: 22
    },
    heading: {
        textAlign: "center",
        fontSize: 32,
        marginBottom: 10,
        textDecorationLine: "underline"
    }
});