import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import LoginScreen  from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import colors from './utils/colors';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          // Load your fonts here
        });
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setAppIsLoaded(true);
      }
    };

    prepare();

  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);
  
  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View onLayout={onLayout} style={{ flex: 1 }}>
          
          <Stack.Navigator
           screenOptions={{
            headerTitleStyle: {
              fontFamily: 'medium',
              color: 'white'
            },
            headerStyle: {
              backgroundColor: colors.primary
            }
           }}>
            <Stack.Group>
              <Stack.Screen name="Login"
              component={LoginScreen}/>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: "Translate"
                }}
              />
            </Stack.Group>

            <Stack.Group
              screenOptions={{
                presentation: 'containedModal',
                headerStyle: {
                  backgroundColor: 'white'
                },
                headerTitleStyle: {
                  color: colors.textColor,
                  fontFamily: 'medium'
                }
              }}
            >
              <Stack.Screen
                name="languageSelect"
                component={LanguageSelectScreen}
              />
            </Stack.Group>
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
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
