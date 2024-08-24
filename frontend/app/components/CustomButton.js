import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyle, textStyle, isLoading }) => {
    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`rounded-xl min-h-[62] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading}>
            <Text className={`font-[vazir] text-lg ${textStyle}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton