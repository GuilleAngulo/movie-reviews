import React from 'react';

import Actions  from '../components/Actions';
import { shallow } from 'enzyme';


describe('Render <Actions /> component', () => {

    it('actions called properly on click', () => {
        const callback = jest.fn();
        const wrapper = shallow(<Actions onAction={callback}/>);
        /**console.log(wrapper.find('span').at(0).html());
        console.log(wrapper.find('span').at(1).html());
        console.log(wrapper.find('span').at(2).html());**/
        wrapper.find('span').forEach(span => span.simulate('click'));
        const calls = callback.mock.calls;
        expect(calls.length).toBe(3);
        expect(calls[0][0]).toEqual('info');
        expect(calls[1][0]).toEqual('edit');
        expect(calls[2][0]).toEqual('delete');
    });
});