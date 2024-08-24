import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeneralState } from '../contextApi/generalContext';

export default function App() {
    const { setUser } = GeneralState();

    const getUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('token');
            const userJson = await JSON.parse(storedUser);

            setUser(userJson);

            setTimeout(() => {
                if (storedUser && storedToken) {
                    console.log('sholuld go to bioAuth');
                    router.push('/biometricAuth');
                    return
                } else {
                    router.push('/vioRecord');
                };
                // router.push('/vioRecord');
            }, 50);

        } catch (error) {
            console.error(`Error storing user data: `, error);
        } finally {
        };
    };

    useEffect(() => {
        // AsyncStorage.clear()
        getUser();
    }, []);

    return (
        <SafeAreaView className='bg-[#0d6ff0] h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='min-h-[85vh] w-full px-4 justify-center items-center'>
                    <Text className='text-secondary-200 text-4xl'>VioLenz</Text>
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#0d6ff0' style='light' />
        </SafeAreaView>
    );
}