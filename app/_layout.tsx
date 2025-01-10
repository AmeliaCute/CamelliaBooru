import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Globals from '@/constants/Globals';
import { Server } from '@/modules/Server';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Comfortaa: require('../assets/fonts/Comfortaa.ttf'),
  });

  const [isServerLoaded, setIsServerLoaded] = useState(false);
  
  useEffect(() => {
    const loadServers = async () => {
      try {
        console.log('Loading servers... [from app root]');
        await Globals.loadServers();
        await Promise.all(Globals.server.map(async s => await s.load()));
        if(Globals.server.length === 0) {
          console.error('No servers found.');
          return;
        }

        setIsServerLoaded(true);
      } catch (error) {
        console.error('Failed to load servers:', error);
      }
    };

    loadServers();
  }, []);

  useEffect(() => {
    if (loaded && isServerLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isServerLoaded]);

  if (!loaded || !isServerLoaded) {
    console.log("Loading...");
    return null;
  }

  return (

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="parameters" options={{ headerShown: false }} />
          <Stack.Screen name="focus" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView> 
    </ThemeProvider>
  );
}
