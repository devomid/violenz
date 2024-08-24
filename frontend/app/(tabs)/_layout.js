import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import icons from '../../constants/icons';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="justify-center items-center gap-2">
      <Image source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`${focused ? "w-8 h-8" : "w-6 h-6"} text-xs`} />
      <Text className={`${focused ? "font-[vazirBold]" : "vazir"} text-xs`}
        style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#d0d9ff',
        tabBarStyle: {
          backgroundColor: '#0d6ff0',
          height: 70
        }
      }}>
        <Tabs.Screen name="confirmed" options={{
          title: "تایید شده ها", headerShown: false, tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? (icons.confirmedFill) : (icons.confirmedOut)}
              color={color}
              name="تایید شده ها"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name="unconfirmed" options={{
          title: "تایید نشده ها", headerShown: false, tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? (icons.denyFill) : (icons.denyOut)}
              color={color}
              name="تایید نشده ها"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name="vioRecord" options={{
          title: "ثبت تخلف", headerShown: false, tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? (icons.shutterFill) : (icons.shutterOut)}
              color={color}
              name="ثبت تخلف"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name="financial" options={{
          title: "امور مالی", headerShown: false, tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? (icons.financialFill) : (icons.financialOut)}
              color={color}
              name="امور مالی"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name="profile" options={{
          title: "پروفایل", headerShown: false, tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? (icons.profileFill) : (icons.profileOut)}
              color={color}
              name="پروفایل"
              focused={focused}
            />
          )
        }} />
      </Tabs>

    </>
  )
}

export default TabsLayout