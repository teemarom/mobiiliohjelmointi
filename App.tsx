import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import SQLite from './SQLite';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Firebase from './Firebase';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="SQLite" component={SQLite} />
            <Tab.Screen name='Firebase' component={Firebase} />
          </Tab.Navigator>
        </NavigationContainer>
        
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
