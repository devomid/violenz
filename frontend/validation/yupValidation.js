import * as yup from 'yup';

// REGEX RULES
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const UserSignUpValidation = yup.object().shape({
    name: yup.string().min(3, 'لطفا نام خود را بصورت صحیح وارد کنید').max(15, 'لطفا نام خود را بصورت صحیح وارد کنید').required('وارد کردن نام الزامی است'),
    lastName: yup.string().min(3, 'لطفا نام خانوادگی خود را بصورت صحیح وارد کنید').max(15, 'لطفا نام خانوادگی خود را بصورت صحیح وارد کنید').required('وارد کردن نام خانوادگی الزامی است'),
    phoneNumber: yup.string().min(8, 'لطفا شماره همراه معتبر وارد کنید').required('وارد کردن شماره همراه الزامی است'),
    idNo: yup.string().min(10, 'کد ملی باید ده رقمی باشد').max(10, 'کد ملی باید ده رقمی باشد').required('وارد کردن کد ملی الزامی است'),
    email: yup.string().email('لطفا آدرس ایمیل صحیح وارد کنید').required('وارد کردن ایمیل الزامی است'),
    password: yup.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد').matches(passwordRules, { message: "لطفا رمز عبور قوی تری وارد کنید" }).required("وارد کردن رمز عبور الزامی است"),
    repeatPassword: yup.string().required("تکرار رمز عبور الزامی است").oneOf([yup.ref("password"), null], "مقدار وارد شده با رمز عبور شا مطابقت ندارد")
});

export const UserSignInValidation = yup.object().shape({
    phoneNumber: yup.string().min(8, 'لطفا شماره همراه معتبر وارد کنید').required('وارد کردن شماره همراه الزامی است'),
    password: yup.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد').required("وارد کردن رمز عبور الزامی است"),
});

export const VioValidation = yup.object().shape({
    carPlateNumber: yup.string().required('وارد کردن شماره پلاک الزامی است'),
    violationType: yup.string().required('انتخاب نوع تخلف الزامی است'),
    violationGeoLocation: yup.string().required('محل وقوع تخلف باید مشخص شود'),
    violationPicture: yup.string().required('تخلف بدون تصویر به تایید نخواهد رسید')
});

export const CarPlateValidation = yup.object().shape({
    twoDigits: yup.number().required('پر کردن تمام فیلد ها اجباریست'),
    plateLetter: yup.string().required('پر کردن تمام فیلد ها اجباریست'),
    threeDigits: yup.number().required('پر کردن تمام فیلد ها اجباریست'),
    iranNo: yup.number().required('پر کردن تمام فیلد ها اجباریست')
})