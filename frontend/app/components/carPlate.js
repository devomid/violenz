import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
const flag = require('../../assets/images/images.png')
import { Dropdown } from 'react-native-element-dropdown';
import { Formik } from 'formik';
import { CarPlateValidation } from '../../validation/yupValidation';


const CarPlate = ({ setCarPlateNumber }) => {
    const [selected, setSelected] = useState("");
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'ب', value: '1' },
        { label: 'ت', value: '2' },
        { label: 'ج', value: '3' },
        { label: 'چ', value: '4' },
        { label: 'ح', value: '5' },
        { label: 'خ', value: '6' },
        { label: 'د', value: '7' },
        { label: 'ذ', value: '8' },
        { label: 'ر', value: '9' },
        { label: 'ز', value: '10' },
        { label: 'س', value: '11' },
        { label: 'ش', value: '12' },
        { label: 'ص', value: '13' },
        { label: 'ض', value: '14' },
        { label: 'ط', value: '15' },
        { label: 'ظ', value: '16' },
        { label: 'ع', value: '17' },
        { label: 'غ', value: '18' },
        { label: 'ف', value: '19' },
        { label: 'ق', value: '20' },
        { label: 'ک', value: '21' },
        { label: 'گ', value: '22' },
        { label: 'ل', value: '23' },
        { label: 'م', value: '24' },
        { label: 'ن', value: '25' },
        { label: 'و', value: '26' },
        { label: 'ه', value: '27' },
        { label: 'ی', value: '28' },
    ];

    const gatterPlateData = () => {
        let plateNumberFromitsComponent = `${twoDigits} ${plateLetter} ${threeDigits} ${iranNo}`;
        setCarPlateNumber(plateNumberFromitsComponent);
    };

    return (
        <View style={styles.mainContainer}>
            <Formik
                initialValues={{
                    twoDigits: '',
                    plateLetter: '',
                    threeDigits: '',
                    iranNo: ''
                }}
                onSubmit={gatterPlateData}
                validationSchema={CarPlateValidation}
            >
                {({ values, errors, touched, handleSubmit, handleBlur, handleChange }) => (
                    <>
                        <View style={styles.littleConrainer}>
                            <Image style={styles.flag} source={flag} />
                            <Text style={styles.txt}>I.R.</Text>
                            <Text style={styles.txt}>IRAN</Text>
                        </View>

                        <View style={styles.twoDigits}>
                            {/* <TextInput keyboardType='number-pad' maxLength={2} style={styles.twoDigitsInput} placeholder='--' /> */}
                            <FormField title='--' value={values.twoDigits} handleChangeText={handleChange('twoDigits')} otherStyles='mt-7' keyboardType='numeric' />
                        </View>

                        <View style={styles.letterContainer}>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                containerStyle={{ borderRadius: 12 }}
                                itemTextStyle={styles.label}
                                data={data}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'انتخاب حروف' : '...'}
                                searchPlaceholder="جستجو"
                                value={values.plateLetter}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }} />
                        </View>

                        <View style={styles.threeDigits}>
                            {/* <TextInput keyboardType='number-pad' maxLength={3} style={styles.threeDigitsInput} placeholder='---' /> */}
                            <FormField title='---' value={values.threeDigits} handleChangeText={handleChange('threeDigits')} otherStyles='mt-7' keyboardType='numeric' />
                        </View>

                        <View style={styles.iranNo}>
                            <Text style={styles.iran}>ایران</Text>
                            {/* <TextInput keyboardType='number-pad' maxLength={2} style={styles.iranNoInput} placeholder='--' /> */}
                            <FormField title='--' value={values.iranNo} handleChangeText={handleChange('iranNo')} otherStyles='mt-7' keyboardType='numeric' />
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default CarPlate

const styles = StyleSheet.create({
    mainContainer: {
        height: 90,
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1.65,
        borderRadius: 16,
    },
    littleConrainer: {
        width: '11.5%',
        padding: 5,
        backgroundColor: 'blue',
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        borderRightWidth: 1
    },
    flag: {
        height: 15,
        width: 25,
        resizeMode: 'cover',
        marginTop: 10,
        marginBottom: 12,
    },
    txt: {
        fontSize: 11,
        color: 'white'
    },
    twoDigits: {
        width: '25%'
    },
    twoDigitsInput: {
        height: '100%',
        fontSize: 40,
        letterSpacing: 20,
        paddingRight: 15,
        paddingLeft: 12
    },
    letterContainer: {
        width: '15%',
        justifyContent: 'center',
    },
    placeholderStyle: {
        fontSize: 10,
        fontFamily: 'vazir',
        textAlign: 'right'
    },
    selectedTextStyle: {
        fontSize: 35,
        fontFamily: 'vazirBold',
        textAlign: 'right'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 8,
        fontFamily: 'vazir',
        textAlign: 'right'
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        right: 10,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontFamily: 'vazir',
    },
    threeDigits: {
        width: '35%',
    },
    threeDigitsInput: {
        height: '100%',
        fontSize: 40,
        letterSpacing: 16,
        paddingRight: 13,
        paddingLeft: 14
    },
    iranNo: {
        width: '15%',
        padding: 5,
        borderLeftWidth: 1,
        alignItems: 'center'
    },
    iran: {
        fontSize: 15,
        fontFamily: 'vazirLight',
        textAlign: 'right'
    },
    iranNoInput: {
        height: '60%',
        width: '90%',
        fontFamily: 'vazirBold',
        fontSize: 30,
        letterSpacing: 5
    }
})