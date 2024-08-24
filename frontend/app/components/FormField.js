import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import icons from '../../constants/icons';

const FormField = ({ title, value, handleChangeText, otherStyles, placeholder, keyboardType, kind, textAlign, src, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-right text-gray-100 font-vazir'>{title}</Text>

            <View style={{ borderBottomWidth: 0.6, borderBottomColor: 'white', padding: 5, flexDirection: 'row' }} >
                <TextInput textAlign={textAlign} className='flex-1 text-white text-base font-vazir' value={value} placeholder={placeholder} placeholderTextColor='#7b7b8b' onChangeText={handleChangeText} secureTextEntry={kind === 'password' && !showPassword} keyboardType={keyboardType} />
                {kind === 'password' ? (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image tintColor={showPassword ? 'white' : 'white'} className='w-5 h-5' resizeMethod='contain' source={!showPassword ? icons.noEye : icons.eye} />
                    </TouchableOpacity>
                ) : (
                    <Image tintColor={showPassword ? 'white' : 'white'} className='w-5 h-5' resizeMethod='contain' source={src} />
                )}

            </View>
        </View>
    )
}

export default FormField