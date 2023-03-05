import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
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
      style={styles.container}
      data={devices}
      keyExtractor={item => item.id.toString()}
      renderItem={_renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
