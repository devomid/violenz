import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

const Landing = () => {
    return (
        <SafeAreaView className='bg-[#0d6ff0] h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='min-h-[85vh] w-full px-4 justify-center items-center'>
                    <Text className='text-secondary-200 text-4xl'>VioLenz</Text>
                    <CustomButton title='ورود به حساب کاربری' handlePress={() => router.replace('/signIn')} containerStyle="w-full mt-7 bg-[#F08E0D]" textStyle="text-[#fff]" />
                    <CustomButton title='ایجاد حساب کاربری' handlePress={() => router.replace('/signUp')} containerStyle="w-full mt-7 border-1 border-2 border-[#F08E0D]" textStyle="text-[#fff]" />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#0d6ff0' style='light' />
        </SafeAreaView>
    )
}

export default Landing