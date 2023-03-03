import {create} from 'zustand';
import {BluetoothDevice} from 'react-native-bluetooth-classic';

type Device = {
  selectedDevice: BluetoothDevice | undefined;
  setSelectedDevice: (device: BluetoothDevice) => void;
};

export const useBluetoothDeviceStore = create<Device>(set => ({
  selectedDevice: undefined,
  setSelectedDevice: (device: BluetoothDevice) => set({selectedDevice: device}),
}));
