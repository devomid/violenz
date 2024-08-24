import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='signIn' options={{ headerShown: false }} />
        <Stack.Screen name='signUp' options={{ headerShown: false }} />
        <Stack.Screen name='passRecovery' options={{ headerShown: false }} />
        <Stack.Screen name='phoneVerification' options={{ headerShown: false }} />
        <Stack.Screen name='landing' options={{ headerShown: false }} />
        <Stack.Screen name='biometricAuth' options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor='#0d6ff0' style='light' />
    </>
  )
}

export default AuthLayout