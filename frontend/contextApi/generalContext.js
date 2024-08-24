import { createContext, useContext, useState } from 'react';

const GeneralContext = createContext();

const GeneralProvider = ({ children }) => {
    const [violationImage, setViolationImage] = useState(3);
    const [user, setUser] = useState({});
    const [authStat, setAuthStat] = useState(false);
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [signInMsg, setSignInMsg] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [signUpMsg, setSignUpMsg] = useState('');
    const [vioSendSuccess, setVioSendSuccess] = useState(false);
    const [vioSendMsg, setVioSendMsg] = useState('')
    const [vioGetSuccess, setVioGetSuccess] = useState(false);
    const [vioGetMsg, setVioGetMsg] = useState('مشکلی در دریافت اطلاعات پیش آمده. لطفا بعدا دوباره امتحان کنید')
    const [vioEditSuccess, setVioeditSuccess] = useState(false);
    const [vioEditMsg, setVioEditMsg] = useState('مشکلی در اصلاح تخلف پیش آمده. لطفا بعدا دوباره امتحان کنید')
    const [vioDeleteSuccess, setVioDeleteSuccess] = useState(false);
    const [vioDeleteMsg, setVioDeleteMsg] = useState('مشکلی در حذف تخلف پیش آمده. لطفا بعدا دوباره امتحان کنید')

    return (
        <GeneralContext.Provider value={{
            violationImage, setViolationImage,
            user, setUser,
            authStat, setAuthStat,
            signInSuccess, setSignInSuccess,
            signInMsg, setSignInMsg,
            signUpSuccess, setSignUpSuccess,
            signUpMsg, setSignUpMsg,
            vioSendSuccess, setVioSendSuccess,
            vioSendMsg, setVioSendMsg,
            vioGetSuccess, setVioGetSuccess,
            vioGetMsg, setVioGetMsg,
            vioEditSuccess, setVioeditSuccess,
            vioEditMsg, setVioEditMsg,
            vioDeleteSuccess, setVioDeleteSuccess,
            vioDeleteMsg, setVioDeleteMsg
        }}>
            {children}
        </GeneralContext.Provider>
    )
};

export const GeneralState = () => {
    return useContext(GeneralContext);
};

export default GeneralProvider;
