type Params = {
  data: string[];
  sampleCount: number;
  delimeter: string;
};

export const computeData = ({delimeter, sampleCount, data}: Params): number[] =>
  data
    .filter(d => d[0] === delimeter)
    .map(v => Number(v.slice(1)))
    .map(n => {
      if (delimeter === 'A' && n < 0.1) {
        return 0;
      }
      return n;
    })
    .reverse()
    .slice(0, sampleCount)
    .reverse();
