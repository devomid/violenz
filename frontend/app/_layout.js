import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import GeneralProvider from '../contextApi/generalContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded, error] = useFonts({
    'oswald': require('../assets/fonts/Oswald-VariableFont_wght.ttf'),
    'vazir': require('../assets/fonts/Vazir.ttf'),
    'vazirLight': require('../assets/fonts/Vazir-Light.ttf'),
    'vazirBold': require('../assets/fonts/Vazir-Bold.ttf'),
    'jadid': require('../assets/fonts/BJadidBd.ttf'),
    'lotous': require('../assets/fonts/BLotus.ttf'),
    'mitra': require('../assets/fonts/BMitra.ttf'),
    'roya': require('../assets/fonts/BRoya.ttf')
  });

  useEffect(() => {
    
    if (error) throw error;
    
    if (fontsLoaded) SplashScreen.hideAsync();
    
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GeneralProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      </Stack>
    </GeneralProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})