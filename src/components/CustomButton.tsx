import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Props = {
  color: string;
  title: string;
  loading?: boolean;
  onPress: () => {};
};

export const CustomButton = ({
  loading,
  title,
  color,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress}>
      <View
        style={[styles.container, {backgroundColor: loading ? '#444' : color}]}>
        <Text style={styles.title}> {title} </Text>
        {loading && (
          <ActivityIndicator
            style={styles.indicator}
            color="#fff"
            size={'small'}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    marginLeft: 10,
  },
  title: {
    color: '#fff',
  },
});
