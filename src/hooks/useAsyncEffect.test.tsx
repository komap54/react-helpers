import React from 'react';
import { cleanup } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import wait from './../helpers/Wait';
import useAsyncEffect from './useAsyncEffect';

const Example = (cleanUp: () => void) => () => {
  const [state1, setState1] = React.useState(0);
  useAsyncEffect(async () => {
    await wait(1000);
    setState1(v => v + 1);
    await wait(1000);
    return cleanUp;
  }, [state1]);
  return [state1];
};

describe('hook useAsyncEffect', () => {
  afterEach(cleanup);

  test('should return initial value', () => {
    const cleanup = jest.fn(() => undefined);
    const { result } = renderHook(Example(cleanup));
    expect(cleanup).not.toBeCalled();
  });
});
