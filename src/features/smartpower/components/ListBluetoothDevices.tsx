import React, {useEffect, useState} from 'react';
import BluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {StyleSheet, View, ToastAndroid} from 'react-native';

import {DeviceList} from './DeviceList';
import {Connection} from './Connection';
import {useBluetoothDeviceStore, useBluetoothState} from '../stores';
import {CustomButton} from '../../../components';

/*
 * NOTE: When clicked discovery button check location status on android 12(API31)
 */

export const ListBluetoothDevices = (): JSX.Element => {
  const [bondedDevices, setBondedDevices] = useState<BluetoothDevice[]>([]);
  const [discoveredDevices, setDiscoveredDevices] = useState<BluetoothDevice[]>(
    [],
  );
  const [discovering, setDiscovering] = useState<boolean>(false);
  const {selectedDevice} = useBluetoothDeviceStore();
  const {enabled} = useBluetoothState();

  const getBondedDevices = async () => {
    console.log('[Invoked @getBondedDevices]');
    try {
      console.log('ENABLED:', enabled);
      if (enabled) {
        const bondedDevicesList = await BluetoothClassic.getBondedDevices();
        setBondedDevices(bondedDevicesList);
      } else {
        try {
          await BluetoothClassic.requestBluetoothEnabled();
        } catch (error) {
          ToastAndroid.show(
            'Please enable bluetooth device',
            ToastAndroid.LONG,
          );

          console.log(
            '[Error occured at (enable bluetooth) function @ListBluetoothDevices]',
            error,
          );
        }
      }
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

  useEffect(() => {
    getBondedDevices();
  }, [enabled]);

  return (
    <View style={styles.container}>
      {selectedDevice ? (
        <Connection />
      ) : (
        <>
          <View style={styles.discoverButton}>
            <CustomButton
              loading={discovering}
              color="blue"
              title="Discover Devices"
              onPress={startDiscovery}
            />
          </View>
          <DeviceList
            devices={
              !discovering && discoveredDevices.length !== 0
                ? discoveredDevices
                : bondedDevices
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discoverButton: {
    width: '50%',
    justifyContent: 'center',
  },
});
