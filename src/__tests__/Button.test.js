import React from 'react';

import Button  from '../components/Button';
import { shallow } from 'enzyme';

describe('Render <Button /> component', () => {
    it('renders <button> without href prop', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.type()).toEqual('button');
    });

    it('renders <a> with href prop', () => {
        const wrapper = shallow(<Button href="#" />);
        expect(wrapper.type()).toEqual('a');
    });

    it('allows custom CSS classes', () => {
        const wrapper = shallow(<Button className="Cancelar" />);
        //console.log(wrapper.html());
        expect(wrapper.hasClass('Button Cancelar')).toEqual(true);
    });
});