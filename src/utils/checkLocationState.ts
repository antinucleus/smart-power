import DeviceInfo from 'react-native-device-info';

import {StateResultCallback} from '../types';

export const checkLocationState = async (cb: StateResultCallback) => {
  try {
    console.log('Checking location status');

    const isLocationEnabled = await DeviceInfo.isLocationEnabled();
    cb(isLocationEnabled);
  } catch (error) {
    console.log('Check location status error: ', error);

    cb(false);
  }
};
