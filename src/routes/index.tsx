import React from 'react';

import {Private} from './Private';
import {Public} from './Public';

export const Routes = (): JSX.Element => {
  const auth = true;
  return auth ? <Private /> : <Public />;
};
