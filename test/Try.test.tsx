import 'jest-dom/extend-expect';

import * as React from 'react';

import { cleanup, render } from '@testing-library/react';

import Try from '../src/components/Try';

describe('Try component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
  })
  afterEach(() => {
    cleanup();
    (console.error as any).mockRestore();
    (console.warn as any).mockRestore();
  })
  const ErrorComponent = ({ shouldThrow }: { shouldThrow?: boolean }) => {
    if (shouldThrow) {
      throw new Error('💣');
    } else {
      return null;
    }
  }
  const ErrorParent = () => (
    <>
      <ErrorComponent shouldThrow />
    </>
  )

  test('Render children without errors', () => {
    const { container } = render(<Try><ErrorComponent />Test string;</Try>);
    expect(container.innerHTML).toBe('Test string;');
  });

  test('Should catch error and render nothing', () => {
    const { container, rerender } = render(<Try><ErrorComponent /></Try>);
    rerender(<Try><ErrorComponent shouldThrow /></Try>);
    expect(console.error).toHaveBeenCalledTimes(2);
    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(container.innerHTML).toBe('');
  });

  test('Should catch error from deep children', () => {
    const { container, rerender } = render(<Try><ErrorParent /></Try>);
    rerender(<Try><ErrorParent /></Try>);
    expect(console.error).toHaveBeenCalledTimes(2);
    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(container.innerHTML).toBe('');
  });

  test('Should suppress warning messages if silent === true', () => {
    const { rerender } = render(<Try><ErrorComponent /></Try>);
    rerender(<Try silent><ErrorComponent shouldThrow /></Try>);
    expect(console.warn).toHaveBeenCalledTimes(0);
  });

  test('Should execute onCatch callback and render its result', () => {
    const { container, rerender } = render(<Try><ErrorComponent /></Try>);
    rerender(
      <Try
        silent
        onCatch={(error: Error) => <>{error.message}</>}
      >
        <ErrorComponent shouldThrow />
      </Try>
    );
    expect(container.innerHTML).toBe('💣');
  });
});
