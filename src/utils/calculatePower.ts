import {computeData} from './computeData';

type Params = {
  data: string[];
};

export const calculatePower = ({data}: Params): string => {
  const [amper] = computeData({data, delimeter: 'A', sampleCount: 1});
  const [volt] = computeData({data, delimeter: 'V', sampleCount: 1});

  return (volt * amper).toFixed(2);
};
