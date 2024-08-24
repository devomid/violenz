import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';

const CELL_COUNT = 5;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 10 },
  title: { textAlign: 'center', fontSize: 40 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 60,
    height: 60,
    lineHeight: 45,
    fontSize: 30,
    borderBottomWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    borderRadius: 5,
    color: 'white'
  },
  focusCell: {
    borderColor: '#F08E0D',
  },
});


const PhoneVerification = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  return (
    <SafeAreaView className='bg-[#0d6ff0] h-full'>
      <View className='w-full min-h-[85vh] justify-center px-8 my-6'>
        <Text>لطفا کد تایید ۵ رقمی را وارد کنید</Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Text>
          زمان باقی مانده
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default PhoneVerification
