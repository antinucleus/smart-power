import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

type Props = {
  data: number[];
  range?: number[];
  suffix: string;
  title: string;
};

export const DrawData = ({data, range, suffix, title}: Props): JSX.Element => {
  if (data.length === 0) return <></>;

  return (
    <View style={styles.container}>
      <LineChart
        withVerticalLines={false}
        data={{
          labels: [title],
          datasets: [
            {
              data: [...data],
              color: () => '#fff',
            },
            {
              data: range || [],
              color: () => 'transparent',
              strokeWidth: 0,
              withDots: false,
            },
          ],
        }}
        width={Dimensions.get('window').width - styles.container.padding * 2}
        height={220}
        yAxisLabel=""
        yAxisSuffix={suffix}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: '#ffa726',
          },
          fillShadowGradientFrom: 'transparent',
          fillShadowGradientFromOpacity: 0,
          fillShadowGradientToOpacity: 0,
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  container: {
    padding: 10,
  },
});
