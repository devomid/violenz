import { GeneralState } from "../contextApi/generalContext";

export const useViolation = () => {
    const { setVioSendSuccess, setVioSendMsg } = GeneralState();

    const sendVio = async function (carPlateNumber, violationType, violationGeoLocation, violationPicture, userId, setIsSubmitting) {
        try {
            setIsSubmitting(true);

            const response = await fetch('https://violenzapi.onrender.com/violation/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ carPlateNumber, violationType, violationGeoLocation, violationPicture, userId })
            });
            if (response.ok) {
                const jsonRes = await response.json();
                setVioSendSuccess(true)
                setVioSendMsg('ارسال تخلف با موفقیت انجام شد');
                return jsonRes;
            } else {
                setVioSendSuccess(false);
                setVioSendMsg('مشکلی در ارسال تخلف پیش آمده. لطفا بعدا دوباره امتحان کنید');
            }
        } catch (error) {
            console.log('Error sending Violation: ', error);
        } finally {
            setIsSubmitting(false);
        };
    };
    return ({ sendVio });
};