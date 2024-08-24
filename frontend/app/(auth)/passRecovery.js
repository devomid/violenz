
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import CustomButton from '../components/CustomButton'
import FormField from '../components/FormField'

const PassRecovery = () => {
    const [form, setForm] = useState({ phoneNumber: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submit = () => { router.push('/PhoneVerification') }
    return (
        <SafeAreaView className='bg-[#0d6ff0] h-full'>
            <ScrollView>
                <View className='w-full min-h-[85vh] justify-center px-8 my-6'>

                    <FormField title='شماره همراه' value={form.phoneNumber} handleChangeText={(e) => setForm({ ...form, phoneNumber: e })} otherStyles='mt-7' keyboardType='phone-pad' src={icons.mobile} />

                    <CustomButton title='بازیابی رمز عبور' containerStyle='mt-12' handlePress={submit} isLoading={isSubmitting} />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PassRecovery;