import * as React from 'react';

import { cleanup, render } from '@testing-library/react';

import { Iframe } from './';

(global as any).fetch = jest.fn().mockImplementation(() => new Promise(res => res({ status: 0 })));

describe('If component', () => {
  afterEach(cleanup);

  test('Render iframe with particular src', async (end) => {
    const { container } = render(<Iframe src={"https://codesandbox.io"} />);
    await new Promise(res => setTimeout(res, 10))
    expect(container.innerHTML).toBe('<iframe src=\"https://codesandbox.io\" frameborder=\"0\"></iframe>');
    end();
  });
});