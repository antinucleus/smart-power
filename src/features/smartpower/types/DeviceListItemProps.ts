import {BluetoothDevice} from 'react-native-bluetooth-classic';

export type DeviceListItemProps = {
  device: BluetoothDevice;
  onPress?: () => void;
};
