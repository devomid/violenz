import AsyncStorage from '@react-native-async-storage/async-storage';
import { GeneralState } from '../contextApi/generalContext';

export const useSignUp = () => {
    const { setSignUpMsg, setSignUpSuccess } = GeneralState()

    const storeUserData = async (user, token) => {
        try {
            const jsonUser = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonUser);
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.error(`Error storing user data: `, error);
        };
    };

    const signUpUser = async function (name, lastName, phoneNumber, idNo, email, password, setIsSubmitting) {
        try {
            setIsSubmitting(true);

            const response = await fetch('https://violenzapi.onrender.com/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastName, phoneNumber, idNo, email, password })
            });

            if (response.ok) {
                setSignUpSuccess(true);
                setSignUpMsg('حساب کاربری شما با موفقیت ایجاد شد');
                const jsonRes = await response.json();
                storeUserData(jsonRes.user, jsonRes.token);
                return jsonRes;
            } else {
                setSignUpSuccess(false);
                setSignUpMsg('مشکلی در ثبت نام پیش آمده. لطفا بعدا دوباره امتحان کنید');
            };

        } catch (error) {
            console.log('Error register user:', error);
        } finally {
            setIsSubmitting(false);
        };
    };
    return { signUpUser };
};