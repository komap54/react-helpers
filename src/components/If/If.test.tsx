import * as React from 'react';

import { cleanup, render } from '@testing-library/react';

import { Else, If, Then } from '.';

describe('If component', () => {
  afterEach(cleanup);

  test('Empty render', () => {
    const { container } = render(<If condition={false} />);
    expect(container.innerHTML).toBe('');
  });

  test('Render children if true', () => {
    const { container } = render(<If condition><>Test string</></If>);
    expect(container.innerHTML).toBe('Test string');
  });

  test('Render children if condition === true when children is function', () => {
    const { container } = render(<If condition>{() => <>Test string</>}</If>);
    expect(container.innerHTML).toBe('Test string');
  });
  test('Render null if condition === false when children is function', () => {
    const { container } = render(<If condition={false}>{() => <>Test string</>}</If>);
    expect(container.innerHTML).toBe('');
  });

  test('Render array like children', () => {
    const { container } = render(<If condition={false}>
      <Else>Test</Else>
      <>String</>
    </If>);
    expect(container.textContent).toBe('TestString');
  });

  test('Render Then if true', () => {
    const { container } = render(<If condition>
      <Then>Right string</Then>
      <Else>Wrong string</Else>
    </If>);
    expect(container.innerHTML).toBe('Right string');
  });

  test('Render Then and Else empty if no children', () => {
    const { container } = render(<If condition>
      <Then />
      <Else />
                                 </If>);
    expect(container.innerHTML).toBe('');
  });

  test('Render Else if false', () => {
    const { container } = render(<If condition={false}>
      <Then>Wrong string</Then>
      <Else>Right string</Else>
    </If>);
    expect(container.innerHTML).toBe('Right string');
    const { container: anotherContainer } = render(<If condition={false}><Else>Right string</Else></If>);
    expect(anotherContainer.innerHTML).toBe('Right string');
  });

  test('Render nothing if false', () => {
    const { container } = render(<If condition={false}><>Test string</></If>);
    expect(container.innerHTML).toBe('');
  });
});
