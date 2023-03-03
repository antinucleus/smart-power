import React, {useEffect, useState} from 'react';
import BluetoothClassic from 'react-native-bluetooth-classic';
import {StateChangeEvent} from 'react-native-bluetooth-classic/lib/BluetoothEvent';

import {
  permissionsCheck,
  checkBluetoothState,
  checkLocationState,
} from '../../../utils';
import {ListBluetoothDevices} from '../components/ListBluetoothDevices';
import {useBluetoothDeviceStore} from '../stores/bluetoothDeviceStore';

export const BluetoothDevices = (): JSX.Element => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState<boolean>(false);
  const {selectedDevice} = useBluetoothDeviceStore();

  const handleBluetoothState = (event: StateChangeEvent) => {
    console.log('[StateChangeEvent]', event);

    setBluetoothEnabled(event.enabled);
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

    checkBluetoothState(bluetoothStatus =>
      setBluetoothEnabled(bluetoothStatus),
    );

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
    console.log({bluetoothEnabled});
  }, [bluetoothEnabled]);
  return <ListBluetoothDevices />;
};
