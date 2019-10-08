import * as React from 'react';

import { cleanup, render } from '@testing-library/react';

import { Case, Default, Switch } from './';

describe('Switch component', () => {
  afterEach(cleanup);

  test('Render children without cases', () => {
    const { container } = render(<Switch>{'Test string;'}</Switch>);
    expect(container.innerHTML).toBe('Test string;');
  });

  test('Render null as a children', () => {
    const { container } = render(<Switch></Switch>);
    expect(container.innerHTML).toBe('');
  });

  test('Should render if case condition === true', () => {
    const { container } = render(
      <Switch>
        Test string;
        <Case condition={true}>
          {'Right string;'}
        </Case>
        <Case condition={false}>
          {'Wrong string;'}
        </Case>
      </Switch>
    );
    expect(container.innerHTML).toBe('Test string;Right string;');
  });

  test('Case should accept function as child', () => {
    const { container } = render(
      <Switch>
        Test string;
        <Case condition={true}>
          {() => 'Right string;'}
        </Case>
        <Case condition={false}>
          {'Wrong string;'}
        </Case>
      </Switch>
    );
    expect(container.innerHTML).toBe('Test string;Right string;');
  });


  test('Should render Default if there are no positive cases', () => {
    const { container } = render(
      <Switch>
        <>{'Test string;'}</>
        <Case condition={false}>
          {'Wrong string;'}
        </Case>
        <Default>
          {'Right string;'}
        </Default>
      </Switch>
    );
    expect(container.innerHTML).toBe('Test string;Right string;');
  });

  test('Should not render Default if there are positive cases', () => {
    const { container } = render(
      <Switch>
        Test string;
        <Case condition={true}>
          {'Right string;'}
        </Case>
        <Default>
          {'Wrong string;'}
        </Default>
      </Switch>
    );
    expect(container.innerHTML).toBe('Test string;Right string;');
  });

  test('Should render only one case if condition === true', () => {
    const { container } = render(
      <Switch>
        <>{'Test string;'}</>
        <Case condition={true}>
          {'Right string;'}
        </Case>
        <Case condition={true}>
          {'Wrong string;'}
        </Case>
      </Switch>
    );
    expect(container.innerHTML).toBe('Test string;Right string;');
  });

  test('Should render only all positive cases, when multiple === true', () => {
    const { container } = render(
      <Switch multiple>
        <>{'Test string;'}</>
        <Case condition={true}>
          {'Right string;'}
        </Case>
        <Case condition={false}>
          {'Wrong string;'}
        </Case>
        <Case condition={true}>
          {'Also right string;'}
        </Case>
      </Switch>
    );
    expect(container.innerHTML).toBe('Test string;Right string;Also right string;');
  });

  test('Should render Default if there are no positive cases when multiple === true', () => {
    const { container } = render(
      <Switch multiple>
        <>{'Test string;'}</>
        <Case condition={false}>
          {'Wrong string;'}
        </Case>
        <Default>
          {'Right string;'}
        </Default>
      </Switch>
    );
    expect(container.innerHTML).toBe('Test string;Right string;');
  });

  test('Should render all positive cases, when multiple === true, but not after case with break ===true', () => {
    const { container } = render(
      <Switch multiple>
        <>{'Test string;'}</>
        <Case condition={true} break>
          {'Right string;'}
        </Case>
        <Case condition={false}>
          {'Wrong string;'}
        </Case>
        <Case condition={true}>
          {'Not right string;'}
        </Case>
      </Switch>
    );
    expect(container.innerHTML).toBe('Test string;Right string;');
  });

  test('Should throw error outside', () => {
    console.error = jest.fn();
    const ErrorComponent = ({ shouldThrow }: { shouldThrow?: boolean }) => {
      if (shouldThrow) {
        throw new Error('💣');
      } else {
        return null;
      }
    }
    try {
      const { container } = render(
        <Switch multiple>
          <>{'Test string;'}</>
          <Case condition={true}>
            <ErrorComponent shouldThrow />
          </Case>
        </Switch>
      );
    } catch (e) {
      expect(e.message).toBe('💣');
    }
  });
});
