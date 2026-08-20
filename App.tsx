import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Laskin from './Laskin';
import Arvauspeli from './Arvauspeli';


export default function App() {
  return (
    <View style={styles.container}>
    <Arvauspeli></Arvauspeli>
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
