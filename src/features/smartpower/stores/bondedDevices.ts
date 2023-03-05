import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {create} from 'zustand';

type Device = {
  devices: BluetoothDevice[];
  setDevices: (devices: BluetoothDevice[]) => void;
};

export const useBondedDevicesStore = create<Device>(set => ({
  devices: [],
  setDevices: (devices: BluetoothDevice[]) => set({devices}),
}));
