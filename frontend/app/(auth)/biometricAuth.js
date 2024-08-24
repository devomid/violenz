import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BiometricAuth = () => {

    // const handleBioAuth = async () => {
    //     const compatible = await LocalAuthentication.hasHardwareAsync();
    //     if (compatible) {
    //         console.log('biometricSupport');
    //         const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    //         console.log(savedBiometrics);
    //         if (savedBiometrics) {
    //             console.log('savedBiometrics');
    //             const biometricAuth = await LocalAuthentication.authenticateAsync({
    //                 promptMessage: 'انگشت کن',
    //                 cancelLabel: 'انگشت نکن',
    //                 biometricsSecurityLevel: 'strong',
    //                 fallbackLabel: 'رمز گوشی رو وارد کن'
    //             });
    //             if (!biometricAuth) {
    //                 console.log('!biometricAuth');
    //                 router.replace('/landing');
    //             } else router.replace('/vioRecord');
    //         } else router.replace('/landing');
    //     } else router.replace('/landing');
    // };

    const handleBioAuth = async () => {
        try {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            if (!compatible) {
                router.replace('/landing');
                return;
            }

            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            if (!savedBiometrics) {
                router.replace('/landing');
                return;
            }

            const biometricAuthResult = await LocalAuthentication.authenticateAsync({
                biometricsSecurityLevel: 'strong',
            });

            if (biometricAuthResult.success) {
                router.replace('/vioRecord');
            } else {
                router.replace('/landing');
            }
        } catch (error) {
            console.error('Biometric authentication error:', error);
            router.replace('/landing');
        }
    };


    useEffect(() => {
        handleBioAuth()
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
    )
}

export default BiometricAuth