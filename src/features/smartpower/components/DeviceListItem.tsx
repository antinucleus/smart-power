import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {DeviceListItemProps} from '../types';
import {useBluetoothDeviceStore} from '../stores/bluetoothDeviceStore';

export const DeviceListItem = ({device}: DeviceListItemProps): JSX.Element => {
  const {selectedDevice, setSelectedDevice} = useBluetoothDeviceStore();

  const handleOnPress = () => {
    console.log('[Device Selected]:', device.name);
    setSelectedDevice(device);
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.container}>
        <View
          style={[
            styles.info,
            {
              backgroundColor:
                selectedDevice?.address === device.address ? '#0f0' : '#fff',
            },
          ]}>
          <Text style={styles.deviceName}>{device.name} </Text>
          <Text style={styles.deviceId}>{device.id} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deviceName: {
    color: '#000',
    fontSize: 16,
  },
  deviceId: {
    color: '#333',
  },
  info: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
  },
});
