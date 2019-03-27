import * as React from 'react';
import { configure, shallow, mount } from 'enzyme';
import helpers from '../src/react-helpers';

const Adapter = require('enzyme-adapter-react-16');
const { If } = helpers;

configure({ adapter: new Adapter() });

describe('If component', () => {
  test('Empty render', () => {
    const wrapper = shallow(<If condition={false} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  test('Render children if true', () => {
    const wrapper = shallow(<If condition={true}><>{'Test string'}</></If>);
    expect(wrapper.children().text()).toBe('Test string');
  });

  test('Render Then if true', () => {
    const wrapper = shallow(<If condition={true} then={() => <>Test string</>} />);
    expect(wrapper.children().text()).toBe('Test string');
  });

  test('Render Else if false', () => {
    const wrapper = shallow(<If condition={false} else={() => <>Test string</>} />);
    expect(wrapper.children().text()).toBe('Test string');
  });

  test('Render nothing if false', () => {
    const wrapper = shallow(<If condition={true}><>{'Test string'}</></If>);
    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
