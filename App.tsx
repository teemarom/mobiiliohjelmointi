import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import ReseptiHaku from './ReseptiHaku';

export default function App() {
  return (

      <View style={styles.container} >
        <ReseptiHaku />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
