import * as React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { If, Then, Else } from '../src/components/If';

const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

describe('If component', () => {
  test('Empty render', () => {
    const wrapper = shallow(<If condition={false} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  test('Render children if true', () => {
    const wrapper = shallow(<If condition={true}><>{'Test string'}</></If>);
    expect(wrapper.text()).toBe('Test string');
  });

  test('Render Then if true', () => {
    const wrapper = shallow(<If condition={true} ><Then>Right string</Then><Else>Wrong string</Else></If>);
    expect(wrapper.text()).toBe('Right string');
  });

  test('Render Else if false', () => {
    const wrapper = shallow(<If condition={false} ><Then>Wrong string</Then><Else>Right string</Else></If>);
    expect(wrapper.text()).toBe('Right string');
  });

  test('Render nothing if false', () => {
    const wrapper = shallow(<If condition={false}><>{'Test string'}</></If>);
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
