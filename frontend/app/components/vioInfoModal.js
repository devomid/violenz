import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import CarPlate from '../components/carPlate';
import TicketInfo from '../components/ticketInfo';
import { GeneralState } from '../../contextApi/generalContext';
import icons from '../../constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik'
import { VioValidation } from '../../validation/yupValidation';
import { useViolation } from '../../hooks/useViolation';
import AsyncStorage from '@react-native-async-storage/async-storage'
import FormField from './FormField';


const VioInfoModal = ({ open, setOpen, violationImage, isCapturing, isUploading }) => {
    // const { violationImage, setViolationImage } = GeneralState();
    const [selected, setSelected] = useState("");
    const [vioValue, setVioValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [carPlateNumber, setCarPlateNumber] = useState('');
    const { sendVio } = useViolation()

    const data = [
        { label: 'سبقت غیرمجاز در راه‌های دوطرفه', value: '2003' },
        { label: 'سبقت از سمت راست وسیله نقلیه دیگر در راه‌هایی که در هر طرف رفت و برگشت فقط یک خط عبوری وجود دارد', value: '2041' },
        { label: 'سبقت از اتوبوس و کامیون داخل شهر', value: '2043' },
        { label: 'عبور از چراغ قرمز راهنمایی و رانندگی', value: '2004' },
        { label: 'حرکت با دنده عقب در آزادراه‌ها و بزرگراه‌ها', value: '2006' },
        { label: 'عبور از محل ممنوع (ورود ممنوع)', value: '2009' },
        { label: 'عبور وسایل نقلیه از پیاده‌رو', value: '2011' },
        { label: 'توقف ممنوع (توقف مطلقا ممنوع)', value: '2062' },
        { label: 'توقف دوبله در محل ایستادن ممنوع', value: '2029' },
        { label: 'توقف دوبله در معابر', value: '2085' },
        { label: 'توقف وسایل نقلیه در پیاده‌رو', value: '2107' },
        { label: 'توقف در محل‌های اختصاصی معلولان و جانبازان', value: '2173' },
        { label: 'پارک در ایستگاه اتوبوس و سایر وسایل نقلیه عمومی', value: '2076' },
        { label: 'توقف وسایل نقلیه در حاشیه راه‌ها برای فروش کالا', value: '2088' },
        { label: 'توقف در ابتدا و انتهای پیچ‌ها، روی پل، داخل تونل و داخل حریم تقاطع‌های راه‌آهن', value: '2044' },
        { label: 'عبور یا توقف وسایل نقلیه باربری سنگین و اتوبوس‌های برون‌شهری در معابر شهری در ساعت غیرمجاز', value: '2140' },
        { label: 'دور زدن ممنوع', value: '2013' },
        { label: 'تجاوز به چپ از محور راه', value: '2010' },
        { label: 'گردش به چپ یا به راست در محل ممنوع', value: '2077' },
        { label: 'استفاده از تلفن همراه در سرعت کمتر از ۶۰ کیلومتر', value: '2072' },
        { label: 'در آغوش داشتن اطفال در حین رانندگی', value: '2023' },
        { label: 'حمل جنازه یا وسایل نقلیه غیرمجاز', value: '2064' },
        { label: 'عدم استفاده از کلاه ایمنی توسط راننده و سرنشین موتورسیکلت در حین رانندگی', value: '2092' },
        { label: 'عدم استفاده از کمربند ایمنی توسط راننده یا سرنشینان وسیله نقلیه در حال حرکت در آزادراه‌ها و بزرگراه‌ها و جاده‌ها', value: '2093' },
        { label: 'عدم استفاده از کمربند ایمنی توسط راننده یا سرنشینان وسیله نقلیه در حال حرکت در معابر شهری و روستایی', value: '2160' },
        { label: 'سوار و پیاده کردن سرنشین در محل‌های غیرمجاز یا به‌نحوی که موجب اختلال در عبور و مرور شود', value: '2150' },
        { label: 'حمل سرنشین اضافی با موتورسیکلت به‌ازای هر نفر', value: '2164' },
        { label: 'باز گذاشتن درب صندوق عقب وسیله نقلیه در حال حرکت، نصب یا قرار دادن هر شئ که مانع دید عقب یا جلو راننده شود', value: '2156' },
        { label: 'باز کردن درب وسیله نقلیه بدون رعایت احتیاط در حال حرکت و حین توقف یا باز گذاشتن درب وسیله نقلیه در سمت سواره‌رو', value: '2119' },
        { label: 'حرکت نکردن وسایل نقلیه بین دو خط یا تغییر خط حرکت بدون رعایت مقررات مربوطه در معابر خط‌کشی‌شد', value: '2050' },
        { label: 'عبور وسایل نقلیه غیرمجاز از خطوط ویژه', value: '2051' },
        { label: 'حرکت در پوشش یا تعقیب وسایل نقلیه امدادی', value: '2141' },
        { label: 'رانندگی با وسیله نقلیه دودزا', value: '2090' },
        { label: 'پرتاب کردن یا ریختن ضایعات، زباله، اشیا، آب دهان و بینی و امثال آنها از وسیله نقلیه به سطح معابر', value: '2072' },
        { label: 'تخلیه نخاله، زباله، مصالح ساختمانی، فاضلاب و ایجاد هرگونه مانع در مسیر عبور وسایل نقلیه در راه‌ها و حریم آنها', value: '2058' },
        { label: 'تعمیر یا شستشوی وسیله نقلیه در راه‌های عمومی', value: '2100' },
    ];

    const confirmAndSend = async (vlues) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userId = storedUser._id;
        await sendVio(carPlateNumber, vlues.violationType, vlues.violationGeoLocation, vlues.violationPicture, userId, setIsSubmitting);
    };

    return (
        <View>

            <Modal animationType="slide" visible={open} onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                <SafeAreaView style={styles.mainContainer}>
                    <Formik
                        initialValues={{
                            carPlateNumber: '',
                            violationType: '',
                            violationGeoLocation: '',
                            violationPicture: ''
                        }}
                        validationSchema={VioValidation}
                        onSubmit={() => confirmAndSend(values)}
                    >
                        {({ values, errors, touched, handleSubmit, handleBlur, handleChange }) => (

                            <>
                                <ScrollView style={{ marginBottom: 70 }}>
                                    <View style={styles.infoContainer}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                            <Text style={{ fontFamily: 'vazirBold', fontSize: 20 }}>
                                                تخلف شماره {2 + 2}
                                            </Text>
                                        </View>

                                        <View style={styles.vioImageContainer}>
                                            <Image style={styles.vioImage} source={{ uri: violationImage }} />
                                        </View>

                                        <View style={styles.dropdownContainer}>
                                            <Dropdown
                                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                iconStyle={styles.iconStyle}
                                                containerStyle={{ borderRadius: 12 }}
                                                itemTextStyle={styles.label}
                                                data={data}
                                                search
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!isFocus ? 'نوع تخلف' : '...'}
                                                searchPlaceholder="جستجو..."
                                                value={values.violationType}
                                                onFocus={() => setIsFocus(true)}
                                                onBlur={() => setIsFocus(false)}
                                                onChange={item => {
                                                    setVioValue(item.value);
                                                    setIsFocus(false);
                                                }}
                                                renderLeftIcon={() => (
                                                    <AntDesign
                                                        style={styles.icon}
                                                        color={isFocus ? 'blue' : 'black'}
                                                        name="Safety"
                                                        size={20}
                                                    />
                                                )}
                                            />
                                        </View>

                                        <View style={styles.vioPlaceContainer}>
                                            <FormField title='محل وقوع تخلف' value={values.violationGeoLocation} handleChangeText={handleChange('violationGeoLocation')} otherStyles='mt-7' keyboardType='default' />
                                            {/* <TextInput style={styles.vioPlaceInput} placeholder='' /> */}
                                        </View>

                                        <View style={{ width: '97%' }}>
                                            <CarPlate setCarPlateNumber={setCarPlateNumber} />
                                        </View>

                                        <TicketInfo />
                                    </View>

                                </ScrollView>
                                <View style={styles.btnContainer}>
                                    <TouchableOpacity onPress={() => {
                                        console.log('image is', violationImage);
                                        setOpen(false);
                                    }} style={styles.cancelBtn}>
                                        <Text style={styles.cancelBtnTxt}>انصراف</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        console.log('image is', violationImage);
                                        setOpen(false);
                                        Alert.alert('تخلف ارسال شد', 'تخلفی که ثبت کردید با موفقیت ارسال شد و پس از بررسی٬ در صورت مطابقت با قوانین تایید خواهد شد', [
                                            {
                                                text: 'باشه'
                                            }
                                        ]);
                                    }} style={styles.okBtn}>
                                        <Text style={styles.okBtnTxt}>تایید و ارسال تخلف</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
                </SafeAreaView >

            </Modal>
        </View>

    )
}

export default VioInfoModal

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    infoContainer: {
        flex: 6,
        width: '100%'
    },
    vioImageContainer: {
        alignItems: 'center',
        marginBottom: 18,
    },
    vioImage: {
        width: '95%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
        marginTop: 15
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 12,
        paddingHorizontal: 8,
        textAlign: 'right'
    },
    vioPlaceContainer: {
        height: 45,
        marginVertical: 19,
        borderWidth: 0.7,
        borderColor: 'grey',
        borderRadius: 10
    },
    vioPlaceInput: {
        padding: 8,
        textAlign: 'right'
    },
    btnContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 10,
        left: 'auto',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    cancelBtn: {
        borderWidth: 1,
        borderColor: 'tomato',
        borderRadius: 16,
        paddingVertical: 19,
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    okBtn: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 16,
        paddingVertical: 19,
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        // color: 'tomato'
    },
    okBtnTxt: {
        fontFamily: 'vazirBold',
        fontSize: 18,
        color: 'green'
    },
    cancelBtnTxt: {
        fontFamily: 'vazirBold',
        fontSize: 18,
        color: 'tomato'
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        right: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontFamily: 'vazir',
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: 'vazir',
        textAlign: 'right'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'vazir',
        textAlign: 'right'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'vazir',
        textAlign: 'right'
    },
})
