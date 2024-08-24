import * as LocalAuthentication from 'expo-local-authentication'
import { Link, router } from 'expo-router'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import { GeneralState } from '../../contextApi/generalContext'
import { useSignIn } from '../../hooks/useSignIn'
import { UserSignInValidation } from '../../validation/yupValidation'
import CustomButton from '../components/CustomButton'
import FormField from '../components/FormField'


const SignIn = () => {
  const { authStat } = GeneralState();
  const { signInUser } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBioAuth = async (phoneNumber, password) => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) return;

      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) return;

      const biometricAuthResult = await LocalAuthentication.authenticateAsync({
        biometricsSecurityLevel: 'strong',
      });

      if (biometricAuthResult.success) {
        router.replace('/vioRecord');
      } else {
        router.replace('/.');
      }

    } catch (error) {
      console.error('Biometric authentication error:', error);
    }
  }

  useEffect(() => {
    handleBioAuth();
  }, []);

  useEffect(() => {
    if (authStat) {
      router.replace('/vioRecord')
    } else {
      console.log('Error log in');
    }
  }, [authStat]);

  return (
    <SafeAreaView className='bg-[#0d6ff0] h-full'>
      <ScrollView>
        <Formik
          validationSchema={UserSignInValidation}
          initialValues={{
            phoneNumber: '',
            password: ''
          }}
          onSubmit={
            async (values) => {
              await signInUser(values.phoneNumber, values.password, setIsSubmitting);
              router.replace('/phoneVerification')
            }
          }
        >
          {({ values, errors, touched, handleSubmit, handleBlur, handleChange }) => (

            <View className='w-full min-h-[85vh] justify-center px-8 my-6'>

              <FormField title='شماره همراه' value={values.phoneNumber} handleChangeText={handleChange('phoneNumber')} otherStyles='mt-7' keyboardType='phone-pad' src={icons.mobile} />
              <Text>{errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}</Text>

              <FormField title='رمز عبور' value={values.password} handleChangeText={handleChange('password')} otherStyles='mt-7' keyboardType='default' kind='password' />
              <Text>{errors.password && touched.password ? errors.password : ''}</Text>

              <View className='justify-right pt-6 flex-row-reverse gap-2 mr-4'>
                <Text className='text-xs text-gray-100 font-vazir'>رمز عبور یادت رفته؟</Text>
                <Link className='text-xs text-secondary font-vazir' href='passRecovery'>   بازیابی حساب کاربری</Link>
              </View>

              <CustomButton title='ورود به وایولنز' containerStyle="mt-12 bg-[#F08E0D]" textStyle="text-[#fff]" handlePress={handleSubmit} isLoading={isSubmitting} />

              <View className='justify-right pt-6 flex-row-reverse gap-2 mr-4'>
                <Text className='text-lg text-gray-100 font-vazir'>حساب کاربری نداری؟</Text>
                <Link className='text-lg text-secondary font-vazir' href='signUp'>   ثبت نام در وایولنز</Link>
              </View>


            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn