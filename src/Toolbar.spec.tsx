import React from 'react';
import {mount, shallow} from 'enzyme';
import ToolBar from './ToolBar';


describe('<ToolBar />', () => {
    it('Renders without crashing', () => {
        shallow(<ToolBar/>);
    });
    it('Displays the number 4', () => {
        const wrapper = mount(<ToolBar />);
        expect(wrapper.find('p').text()).toBe('4');
    })
})
