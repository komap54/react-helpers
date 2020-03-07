import * as React from 'react';

import { cleanup, render } from '@testing-library/react';

import { AttributeProxy } from '.';

describe('AttributeProxy component', () => {
  afterEach(cleanup);

  test('Empty render', () => {
    const { container } = render(
      <AttributeProxy attributes={{}} direction="child" />
    );

    expect(container.innerHTML).toBe('<div></div>');
  });

  test('Render only children', () => {
    const { container } = render(
      <AttributeProxy attributes={{}} direction="child">
        {'Some text'}
      </AttributeProxy>
    );

    expect(container.textContent).toBe('Some text');
  });

  test('Render of a child with attributes', () => {
    const { getByTitle } = render(
      <AttributeProxy
        attributes={{
          title: 'this is title'
        }}
        direction="child"
      >
        <span>
          {'Some text'}
        </span>
      </AttributeProxy>
    );

    expect(getByTitle('this is title')).not.toBeNull();
  });

  test('Render of a child with class name', () => {
    const { getByText } = render(
      <div>
        <AttributeProxy
          attributes={{
            className: 'someClass'
          }}
          direction="child"
        >
          <div id="testClass">
            {'Some text'}
          </div>
        </AttributeProxy>
      </div>
    );

    expect(getByText('Some text').classList.contains('someClass')).toBeTruthy();
  });

  test('Render from a child with a class, if there is one, then do not add a new one', () => {
    const { getByText } = render(
      <AttributeProxy
        attributes={{
          className: 'someClass'
        }}
        direction="child"
      >
        <div className="someClass">
          {'Some text'}
        </div>
      </AttributeProxy>
    );

    expect(getByText('Some text').classList.length).toEqual(1);
  });

  test('Render with inline styles', () => {
    const { getByText } = render(
      <AttributeProxy
        attributes={{
          style: {
            color: 'red'
          }
        }}
        direction="child"
      >
        <div>
          {'Some text'}
        </div>
      </AttributeProxy>
    );

    expect(getByText('Some text').style.color).toBe('red');
  });
});
