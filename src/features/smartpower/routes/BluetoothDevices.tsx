import React, {useEffect} from 'react';
import BluetoothClassic from 'react-native-bluetooth-classic';
import {StateChangeEvent} from 'react-native-bluetooth-classic/lib/BluetoothEvent';

import {
  permissionsCheck,
  checkBluetoothState,
  checkLocationState,
} from '../../../utils';
import {ListBluetoothDevices} from '../components/ListBluetoothDevices';
import {useBluetoothState} from '../stores';

export const BluetoothDevices = (): JSX.Element => {
  const {enabled, setEnabled} = useBluetoothState();

  const handleBluetoothState = (event: StateChangeEvent) => {
    console.log('[StateChangeEvent]', event);

    setEnabled(event.enabled);
  };

  useEffect(() => {
    permissionsCheck(permissionStatus => {
      if (permissionStatus) {
        console.log('Permission is granted');
      } else {
        console.log(
          'Permission is not granted. You have to grant all permissions otherwise bluetooth will not find devices',
        );
      }
    });

    checkBluetoothState(bluetoothStatus => setEnabled(bluetoothStatus));

    checkLocationState(locationStatus => console.log({locationStatus}));

    const bluetoothEnabledEventListener =
      BluetoothClassic.onBluetoothEnabled(handleBluetoothState);

    const bluetoothDisabledEventListener =
      BluetoothClassic.onBluetoothDisabled(handleBluetoothState);

    return () => {
      bluetoothEnabledEventListener.remove();
      bluetoothDisabledEventListener.remove();
    };
  }, []);

  useEffect(() => {
    console.log({enabled});
  }, [enabled]);
  return <ListBluetoothDevices />;
};
