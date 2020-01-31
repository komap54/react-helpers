import React from 'react';
import { cleanup } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import wait from './../helpers/Wait';
import useAsyncEffect from './useAsyncEffect';

const Example = (cleanUp: () => void) => () => {
  useAsyncEffect(async () => {
    await wait(10);
    return cleanUp;
  }, []);
};

describe('hook useAsyncEffect', () => {
  afterEach(cleanup);

  test('should execute cleanup callback', async (finish) => {
    const cleanup = jest.fn(() => undefined);
    const { rerender, unmount } = renderHook(Example(cleanup));
    expect(cleanup).not.toBeCalled();
    rerender();
    expect(cleanup).not.toBeCalled();
    await wait(100);
    expect(cleanup).not.toBeCalled();
    unmount();
    expect(cleanup).toBeCalled();
    finish();
  });
});
