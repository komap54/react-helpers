import * as React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Iframe } from '.';

(global as any).fetch = jest.fn().mockImplementation(() => new Promise(res => res({ status: 0 })));
const originalError = console.error;

describe('If component', () => {
  beforeAll(() => {
    console.error = (...args: any[]) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }
  })

  afterEach(cleanup);

  afterAll(() => {
    console.error = originalError
  })
  afterEach(cleanup);

  test('Render iframe with particular src', async (end) => {
    const { container } = render(<Iframe src="https://codesandbox.io" />);
    await new Promise(res => setTimeout(res, 10));
    expect(container.innerHTML).toBe('<iframe title=\"react-iframe\" src=\"https://codesandbox.io\" frameborder=\"0\"></iframe>');
    end();
  });
});