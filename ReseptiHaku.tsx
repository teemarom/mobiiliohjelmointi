import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";



export default function ReseptiHaku() {

    type Haut = {
        strMeal: string,
        strMealThumb: string,
        idMeal: string,
        strCountry: string
    }

    const [hakusana, setHakusana] = useState("");
    const [haut, setHaut] = useState<Haut[]>([]);
    const [loading, setLoading] = useState(false);
    const [haettu, setHaettu] = useState(false)

    const handleFetch = () => {
        setLoading(true);
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);
                return response.json()
            })
            .then(data => {
                setHaut(data.meals ?? []);
                setHaettu(true);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.input}
                    placeholder="Search ingredient.."
                    onChangeText={hakusana => setHakusana(hakusana)}
                    value={hakusana}
                />
                <Pressable style={styles.searchButton}
                    onPress={handleFetch}
                >
                    <Text
                        style={styles.searchButtonText}
                    >Search Recipes</Text>
                </Pressable>
            </View>
            { loading ? 
                <ActivityIndicator size="large" />
                :
                    <FlatList style={styles.flatlist}
                        keyboardDismissMode="on-drag"
                        data={haut}
                        renderItem={({ item }) =>
                            <View style={styles.flatlistItem}>
                                <Text style={styles.flatlistText}>
                                    {item.strMeal}
                                </Text>
                                <Text>
                                    Country of origin: {item.strCountry}
                                </Text>
                                <Image
                                    style={styles.flatlistImg}
                                    source={{ uri: item.strMealThumb }}
                                />
                            </View>
                        }
                        ListEmptyComponent={
                            haettu ? (
                            <Text>
                                No recipes found.
                            </Text>
                            ) : null
                        }
                    />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    searchContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 30,
        width: 180,
        borderRadius: 6,
    },
    searchButton: {
        borderRadius: 6,
        height: 30,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 6,
        backgroundColor: '#4185f2',
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
    },
    flatlist: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
    },
    flatlistItem: {
        borderBottomWidth: 2,
        marginTop: 5,
        marginBottom: 5,
        borderColor: "gray"
    },
    flatlistText: {
        fontSize: 22,
        margin: 5,
        fontStyle: "italic"
    },
    flatlistImg: {
        width: 80,
        height: 80,
    }
});