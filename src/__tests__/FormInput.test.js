import React from 'react';

import FormInput  from '../components/FormInput';
import { mount } from 'enzyme';


describe('Render <FormInput /> component', () => {
    it('returns input value', () => {
        let input = mount(<FormInput type="year" />);
        //console.log(input.instance().getValue());
        expect(input.instance().getValue()).toBe(String(new Date().getFullYear()));

        input = mount(
            <FormInput type="rating" defaultValue="3" />
        );
        expect(input.instance().getValue()).toBe(3);
    });
});