import React, {useState} from 'react';
import BluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {Button, View} from 'react-native';

import {DeviceList} from './DeviceList';
import {Connection} from './Connection';
import {useBluetoothDeviceStore} from '../stores';

export const ListBluetoothDevices = (): JSX.Element => {
  const [bondedDevices, setBondedDevices] = useState<BluetoothDevice[]>([]);
  const [discoveredDevices, setDiscoveredDevices] = useState<BluetoothDevice[]>(
    [],
  );
  const [discovering, setDiscovering] = useState<boolean>(false);
  const {selectedDevice} = useBluetoothDeviceStore();

  const getBondedDevices = async () => {
    try {
      const bondedDevicesList = await BluetoothClassic.getBondedDevices();
      setBondedDevices(bondedDevicesList);
    } catch (error) {
      setBondedDevices([]);
      console.log(
        '[Error occured at (getBondedDevices) function @ListBluetoothDevices]',
        error,
      );
    }
  };

  const startDiscovery = async () => {
    try {
      // let granted = await requestAccessFineLocationPermission();

      // if (!granted) {
      //   throw new Error('Access fine location was not granted');
      // }

      setDiscovering(true);

      let currentDevices = [...discoveredDevices];

      try {
        let unpaired = await BluetoothClassic.startDiscovery();

        let index = currentDevices.findIndex(d => !d.bonded);
        if (index >= 0) {
          currentDevices.splice(
            index,
            currentDevices.length - index,
            ...unpaired,
          );
        } else {
          currentDevices.push(...unpaired);
        }

        console.log(`Found ${unpaired.length} unpaired devices.`);
      } finally {
        setDiscoveredDevices(currentDevices);
        setDiscovering(false);
      }
    } catch (error) {
      console.log(
        '[Error occured at (startDiscovery) function @ListBluetoothDevices]',
        error,
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <Button onPress={getBondedDevices} title="Get Bonded Devices" />
        <Button
          onPress={startDiscovery}
          title={`Discover Devices ${discovering ? '(Discovering..)' : ''}`}
        />
      </View>
      {selectedDevice ? (
        <Connection />
      ) : (
        <DeviceList
          devices={
            !discovering && discoveredDevices.length !== 0
              ? discoveredDevices
              : bondedDevices
          }
        />
      )}
    </View>
  );
};
