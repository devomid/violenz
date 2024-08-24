import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../constants/icons';
import CustomButton from '../components/CustomButton';
import VioInfoModal from '../components/vioInfoModal';

const VioRecord = () => {
  const [violationImage, setViolationImage] = useState();
  const [permission, requestPermission] = useCameraPermissions();
  const [vioModalOpen, setVioModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [location, setLocation] = useState();

  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }} >
        <Text style={{ marginBottom: 30, width: '80%', fontFamily: 'vazirBold', textAlign: 'center', fontSize: 16 }} >لطفا دسترسی نرم افزار به دوربین را تایید کنید</Text>
        <CustomButton title='تایید دسترسی' containerStyle="mt-15 bg-[#F08E0D] px-5" textStyle="text-[#fff]" handlePress={requestPermission} />
      </View>
    );
  };

  const pickImage = async () => {
    setIsUploading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setVioModalOpen(true);
        const photoUri = result.assets[0].uri;
        setViolationImage(photoUri);
      };

    } catch (error) {
      console.log('Error retrieving picture from phone storage: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  const captureAndSend = async () => {
    setIsCapturing(true);
    try {
      setVioModalOpen(true)
      const photo = await cameraRef.current.takePictureAsync({ quality: 1, base64: true });
      setViolationImage(photo.uri);
      await MediaLibrary.saveToLibraryAsync(photo.uri);

    } catch (error) {
      console.log('Error capturing picture ', error);
    } finally {
      setIsCapturing(false);
    };
  };

  return (
    <SafeAreaView >
      <VioInfoModal open={vioModalOpen} setOpen={setVioModalOpen} violationImage={violationImage} isCapturing={isCapturing} isUploading={isUploading} location={location} />
      <CameraView style={{ height: '100%' }} ref={cameraRef} animateShutter autofocus='on' facing={'back'}>

        <View className='flex-1 w-full items-center justify-end pb-3'>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 2,
              right: 10,
              width: '15%',
              height: '15%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={pickImage}>
            {isUploading || isCapturing ? (
              <ActivityIndicator size="large" color="#0d6ff0" />
            ) : (
              <Image className='w-8 h-8' resizeMethod='contain' source={icons.upload} tintColor='white' />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={{ borderWidth: 2, borderColor: 'white', borderRadius: 15, width: '95%', height: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }} onPress={captureAndSend}>
            {isUploading || isCapturing ? (
              <ActivityIndicator size="large" color="#0d6ff0" />
            ) : (
              <Image className='w-11 h-11' resizeMethod='contain' source={icons.camera} tintColor='white' />
            )}
          </TouchableOpacity>
        </View>
      </CameraView>
      <StatusBar backgroundColor='#0d6ff0' style='auto' />

    </SafeAreaView>
  )
}

export default VioRecord