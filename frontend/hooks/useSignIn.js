import AsyncStorage from '@react-native-async-storage/async-storage';
import { GeneralState } from '../contextApi/generalContext';

export const useSignIn = () => {
    const { setAuthStat, setSignInErrMsg, setSignInSuccess } = GeneralState();
    const storeUserData = async (user, token) => {
        try {
            const jsonUser = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonUser);
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.error(`Error storing user data: `, error);
        };
    };

    const signInUser = async function (phoneNumber, password, setIsSubmitting) {
        try {
            setIsSubmitting(true);

            const response = await fetch('https://violenzapi.onrender.com/user/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, password })
            });
            console.log(response);
            if (response.ok) {
                setSignInSuccess(true);
                setSignInErrMsg('ورود به حساب کاربری با موفقیت انجام شد');
                const jsonRes = await response.json();
                console.log(jsonRes.authStat);
                storeUserData(jsonRes.user, jsonRes.token);
                setAuthStat(jsonRes.authStat);
            } else {
                setSignInSuccess(false);
                setSignInErrMsg('مشکلی در ورود به حساب کاربری پیش آمده. لطفا بعدا دوباره امتحان کنید');
                const jsonRes = await response.json();
                console.log(jsonRes.error);
            };

        } catch (error) {
            console.log('Error log in user:', error);

        } finally {
            setIsSubmitting(false);
        };
    };
    return { signInUser };
};