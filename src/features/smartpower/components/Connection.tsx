import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  BluetoothDeviceReadEvent,
  BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';

import {DrawData} from './DrawData';
import {useBluetoothDeviceStore} from '../stores';
import {computeData, calculatePower} from '../../../utils';
import {Loading} from './Loading';
import {CustomButton} from '../../../components';

export const Connection = (): JSX.Element => {
  const blref = useRef<BluetoothEventSubscription | undefined>(undefined);
  const {selectedDevice} = useBluetoothDeviceStore();
  const [connected, setConnected] = useState<boolean | undefined>(false);
  const [data, setData] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setConnecting(true);
      await selectedDevice?.connect({
        charset: 'ascii',
        delimiter: '\n',
      });

      initializeRead();

      setConnected(true);
      setConnecting(false);
    } catch (error) {
      setConnecting(false);

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

  function initializeRead() {
    blref.current = selectedDevice?.onDataReceived(
      (event: BluetoothDeviceReadEvent) => onReceivedData(event),
    );
  }

  const onReceivedData = async (event: BluetoothDeviceReadEvent) => {
    setData(prev => [...prev, event.data]);
  };

  useEffect(() => {
    return () => {
      blref.current?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {selectedDevice && (
        <View style={styles.infoContainer}>
          <View
            style={[
              styles.info,
              {
                backgroundColor: connected ? '#0f0' : '#fff',
              },
            ]}>
            <Text style={styles.deviceName}>{selectedDevice.name} </Text>
            <Text style={styles.deviceId}>{selectedDevice.id} </Text>
          </View>
          <View style={styles.connectButtonContainer}>
            <CustomButton
              color="#c33"
              title={connected ? 'Disconnect' : 'Connect'}
              onPress={connected ? handleDisconnect : handleConnect}
              loading={connecting}
            />
          </View>
        </View>
      )}
      {connecting ? (
        <Loading />
      ) : (
        <View>
          <DrawData
            title="Amper"
            data={computeData({data, delimeter: 'A', sampleCount: 15})}
            suffix="A"
            range={[0, 1]}
          />
          <DrawData
            title="Volt"
            data={computeData({data, delimeter: 'V', sampleCount: 15})}
            suffix="V"
            range={[0, 1]}
          />
          {connected && (
            <Text style={styles.watt}> {calculatePower({data})} Watt</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
    marginVertical: 10,
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
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
  },
  infoContainer: {
    padding: 10,
  },
  sendRead: {
    height: 300,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  watt: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
  },
});
