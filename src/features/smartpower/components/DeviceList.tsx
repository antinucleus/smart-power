import React from 'react';
import {FlatList} from 'react-native';
import {BluetoothDevice} from 'react-native-bluetooth-classic';

import {DeviceListItem} from './DeviceListItem';
import {DeviceListProps} from '../types';

export const DeviceList = ({devices}: DeviceListProps): JSX.Element => {
  type Params = {
    item: BluetoothDevice;
  };

  const _renderItem = ({item}: Params) => {
    return <DeviceListItem device={item} />;
  };

  return (
    <FlatList
      data={devices}
      keyExtractor={item => item.id.toString()}
      renderItem={_renderItem}
    />
  );
};
