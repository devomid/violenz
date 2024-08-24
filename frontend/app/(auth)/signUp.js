import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../constants/icons';
import { useSignUp } from '../../hooks/useSignUp';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { UserSignUpValidation } from '../../validation/yupValidation';

const SignUp = () => {
    const { signUpUser } = useSignUp();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <SafeAreaView className='bg-[#0d6ff0] h-full'>
            <ScrollView>
                <Formik
                    validationSchema={UserSignUpValidation}
                    initialValues={{
                        name: '',
                        lastName: '',
                        phoneNumber: '',
                        idNo: '',
                        email: '',
                        password: '',
                        repeatPassword: ''
                    }}
                    onSubmit={
                        async (values) => {
                            await signUpUser(values.name, values.lastName, values.phoneNumber, values.idNo, values.email, values.password, setIsSubmitting);
                            router.replace('/phoneVerification');
                        }
                    }
                >
                    {({ values, errors, touched, handleSubmit, handleBlur, handleChange }) => (
                        <View className='w-full min-h-[85vh] justify-center px-8 my-5'>
                            {/* <View style={{ width: '100%', marginTop: 50 }}>
                                <Snackbar
                                    visible={errors.name ? true : false}
                                    elevation={5}
                                    onDismiss={() => console.log('k')}
                                    duration={1}
                                    style={{ backgroundColor: "#fff", zIndex: 999, width: '100%' }}
                                >
                                    <View><Text>{errors.name}</Text></View>
                                </Snackbar>
                            </View> */}

                            <FormField title='نام' value={values.name} handleChangeText={handleChange('name')} otherStyles='mt-7' keyboardType='default' textAlign='right' src={icons.id} />
                            <Text>{errors.name && touched.name ? errors.name : ""}</Text>

                            <FormField title='نام خانوادگی' value={values.lastName} handleChangeText={handleChange('lastName')} otherStyles='mt-7' keyboardType='default' textAlign='right' src={icons.id} />
                            <Text>{errors.lastName && touched.lastName ? errors.lastName : ""}</Text>

                            <FormField title='شماره همراه' value={values.phoneNumber} handleChangeText={handleChange('phoneNumber')} otherStyles='mt-7' keyboardType='phone-pad' src={icons.mobile} />
                            <Text>{errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}</Text>

                            <FormField title='کد ملی' value={values.idNo} handleChangeText={handleChange('idNo')} otherStyles='mt-7' keyboardType='numeric' src={icons.meliNum} />
                            <Text>{errors.idNo && touched.idNo ? errors.idNo : ''}</Text>

                            <FormField title='آدرس ایمیل' value={values.email} handleChangeText={handleChange('email')} otherStyles='mt-7' keyboardType='email-address' src={icons.atSign} />
                            <Text>{errors.email && touched.email ? errors.email : ''}</Text>

                            <FormField title='رمز عبور' value={values.password} handleChangeText={handleChange('password')} otherStyles='mt-7' keyboardType='default' kind='password' />
                            <Text>{errors.password && touched.password ? errors.password : ''}</Text>

                            <FormField title='تکرار رمز عبور' value={values.repeatPassword} handleChangeText={handleChange('repeatPassword')} otherStyles='mt-7' keyboardType='default' kind='password' />
                            <Text>{errors.repeatPassword && touched.repeatPassword ? errors.repeatPassword : ''}</Text>

                            <CustomButton title='ایجاد حساب کاربری' containerStyle="mt-12 bg-[#F08E0D]" textStyle="text-[#fff]" handlePress={handleSubmit} isLoading={isSubmitting} />

                            <View className='justify-right pt-6 flex-row-reverse gap-2 mr-4'>
                                <Text className='text-lg text-gray-100 font-vazir'>حساب کاربری داری؟</Text>
                                <Link className='text-lg text-secondary font-vazir' href='signIn'>   ورود به وایولنز</Link>
                            </View>

                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView >
    )
}

export default SignUp