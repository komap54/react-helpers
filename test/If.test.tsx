import * as React from 'react';

import { cleanup, render } from '@testing-library/react';

import { Else, If, Then } from '../src/components/If';

describe('If component', () => {
  afterEach(cleanup);

  test('Empty render', () => {
    const { container } = render(<If condition={false} />);
    expect(container.innerHTML).toBe('');
  });

  test('Render children if true', () => {
    const { container } = render(<If condition={true}><>{'Test string'}</></If>);
    expect(container.innerHTML).toBe('Test string');
  });

  test('Render Then if true', () => {
    const { container } = render(<If condition={true}><Then>Right string</Then><Else>Wrong string</Else></If>);
    expect(container.innerHTML).toBe('Right string');
  });

  test('Render Else if false', () => {
    const { container } = render(<If condition={false}><Then>Wrong string</Then><Else>Right string</Else></If>);
    expect(container.innerHTML).toBe('Right string');
  });

  test('Render nothing if false', () => {
    const { container } = render(<If condition={false}><>{'Test string'}</></If>);
    expect(container.innerHTML).toBe('');
  });
});
