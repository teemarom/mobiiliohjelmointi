import { Keyboard, StyleSheet, TouchableWithoutFeedback, } from 'react-native';

import Laskin from './Laskin';
import History from './History';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';



const Tab = createBottomTabNavigator();

export default function App() {
  const [laskut, setLaskut] = useState<string[]>([]);

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Tab.Navigator>
          <Tab.Screen 
            name="Laskin"
            options={{
              tabBarIcon: ({color, size}) => (
                <Entypo name="calculator" size={28} color="black" />
              ),
            }}>
            {() => (
              <Laskin
                laskut={laskut}
                setLaskut={setLaskut}
              />
            )}
          </Tab.Screen>
          <Tab.Screen 
          name="History"
          options={{
            tabBarIcon: ({color, size}) => (
              <AntDesign name="history" size={28} color="black" />
            )
          }}>
            {() => (
              <History laskut={laskut} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </TouchableWithoutFeedback>
    </NavigationContainer>
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
