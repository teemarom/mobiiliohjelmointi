import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Laskin from './Laskin';
import Arvauspeli from './Arvauspeli';
import Ostoslista from './Ostoslista';


export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Ostoslista />
      </View>
    </TouchableWithoutFeedback>
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
