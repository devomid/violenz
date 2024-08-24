import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TicketInfo = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleTxt}>ساعت</Text>
                <Text style={styles.titleTxt}>روز</Text>
                <Text style={styles.titleTxt}>ماه</Text>
                <Text style={styles.titleTxt}>سال</Text>
                <Text style={styles.titleTxt}>محدوده وقوع تخلف</Text>
                <Text style={styles.titleTxt}>مبلغ جریمه</Text>
                <Text style={styles.titleTxt}>سهم کاربر (در صورت تایید)</Text>
            </View>
        </View>
    )
}

export default TicketInfo

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        marginBottom: 150
    },
    titleContainer: {
        height: '65%',
        justifyContent: 'space-between'
    },
    titleTxt: {
        fontFamily: 'vazirBold',
        fontSize: 16,
        textAlign: 'right',
        lineHeight: 30
    }
})