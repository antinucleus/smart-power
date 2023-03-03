import BluetoothClassic from 'react-native-bluetooth-classic';

import {StateResultCallback} from '../types';

export const checkBluetoothState = async (cb: StateResultCallback) => {
  try {
    console.log('Checking bluetooth status');

    let isBluetoothEnabled = await BluetoothClassic.isBluetoothEnabled();
    cb(isBluetoothEnabled);
  } catch (error) {
    console.log('Check bluetooth status error: ', error);

    cb(false);
  }
};
