import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {BluetoothDeviceReadEvent} from 'react-native-bluetooth-classic';
import {useBluetoothDeviceStore} from '../stores';

export const Connection = (): JSX.Element => {
  const {selectedDevice} = useBluetoothDeviceStore();
  const [connected, setConnected] = useState<boolean | undefined>(false);

  const handleConnect = async () => {
    try {
      await selectedDevice?.connect({
        charset: 'ascii',
        delimiter: '\n',
      });

      initializeRead();

      setConnected(true);
    } catch (error) {
      console.log(
        '[Error occured at (handleConnect) function @Connection]',
        error,
      );
    }
  };

  const handleDisconnect = async () => {
    try {
      await selectedDevice?.disconnect();

      setConnected(false);
    } catch (error) {
      console.log(
        '[Error occured at (handleDisconnect) function @Connection]',
        error,
      );
    }
  };

  const handleReadData = async () => {
    try {
      const message = await selectedDevice?.read();
      console.log(message);
    } catch (error) {
      console.log(
        '[Error occured at (handleReadData) function @Connection]',
        error,
      );
    }
  };

  const handleSendData = async () => {
    try {
      const data = await selectedDevice?.write('Hello');
      console.log(data);
    } catch (error) {
      console.log(
        '[Error occured at (handleSendData) function @Connection]',
        error,
      );
    }
  };

  function initializeRead() {
    selectedDevice?.onDataReceived((data: BluetoothDeviceReadEvent) =>
      onReceivedData(data),
    );
  }

  const onReceivedData = async (event: BluetoothDeviceReadEvent) => {
    console.log('[Data]: ', event.data);
  };

  return (
    <View style={styles.container}>
      <Text>Selected Bluetooth Device</Text>
      {selectedDevice && (
        <View>
          <View style={styles.info}>
            <Text style={styles.deviceName}>{selectedDevice.name} </Text>
            <Text style={styles.deviceId}>{selectedDevice.id} </Text>
          </View>
          <View style={styles.connectButtonContainer}>
            <TouchableOpacity
              onPress={connected ? handleDisconnect : handleConnect}>
              <View style={styles.connectButton}>
                <Text style={styles.connectButtonText}>
                  {connected ? 'Disconnect' : 'Connect'}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.sendRead}>
            <Button title="Read" onPress={handleReadData} />
            <Button title="Send" onPress={handleSendData} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectButton: {
    width: 100,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#025f00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButtonContainer: {
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
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
  sendRead: {
    height: 300,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
