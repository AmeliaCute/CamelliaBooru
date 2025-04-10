import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Globals from '@/constants/Globals';
import { Server } from '@/modules/Server';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter(); // Moved to top-level
  const [loaded] = useFonts({
    Comfortaa: require('../assets/fonts/Comfortaa.ttf'),
  });

  const [isServerLoaded, setIsServerLoaded] = useState(false);
  const [mounted, setMounted] = useState(true); // To track component mount state

  const loadServers = useCallback(async () => {
    try {
      console.log('Loading servers... [from app root]');
      await Globals.loadServers();
      await Promise.all(Globals.server.map(async s => await s.load()));

      setIsServerLoaded(true);
    } catch (error) {
      console.error('Failed to load servers:', error);
    }
  }, [router, mounted]);

  useEffect(() => {
    setMounted(true);
    loadServers();
    return () => setMounted(false); // Cleanup on unmount
  }, [loadServers]);

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