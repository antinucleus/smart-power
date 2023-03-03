import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

import {StateResultCallback} from '../types';

export const permissionsCheck = async (cb: StateResultCallback) => {
  if (Platform.OS === 'android') {
    const apiLevel = await DeviceInfo.getApiLevel();

    if (apiLevel < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      return cb(granted === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      const isAllGranted =
        result['android.permission.BLUETOOTH_SCAN'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.BLUETOOTH_CONNECT'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED;

      cb(isAllGranted);
    }
  }
  return cb(true);
};
