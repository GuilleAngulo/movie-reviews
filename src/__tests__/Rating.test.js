import React from 'react';

import Rating  from '../components/Rating';
import { mount } from 'enzyme';


describe('Render <Rating /> component', () => {
    const wrapper = mount(<Rating />);
    const stars = wrapper.find('span');

    it('renders 5 stars by default', () => {
        expect(stars.length).toBe(5);
    });

    it('handles mouseOver', () => {
        /** MOUSE OVER THE 4 STAR */
        stars.at(3).simulate('mouseOver');
        //console.log(wrapper.find('span').first().html());
        expect(wrapper.find('span').first().hasClass('RatingOn')).toEqual(true);
        expect(wrapper.find('span').at(3).hasClass('RatingOn')).toEqual(true);
        expect(wrapper.find('span').at(4).hasClass('RatingOn')).toEqual(false);
        //console.log(wrapper.state().rating);
        //console.log(wrapper.state().tmpRating);
        expect(wrapper.state().rating).toBe(0);
        expect(wrapper.state().tmpRating).toBe(4);
    });

    it('handles mouseOut', () => {
        stars.at(3).simulate('mouseOut');
        //console.log(wrapper.find('span').first().html())
        expect(wrapper.find('span').first().hasClass()).toBeFalsy();
        expect(wrapper.find('span').at(3).hasClass()).toBeFalsy();
        expect(wrapper.find('span').at(4).hasClass()).toBeFalsy();
        expect(wrapper.state().rating).toBe(0);
        expect(wrapper.state().tmpRating).toBe(0);
    });

    it('handles click on star', () => {
        stars.at(3).simulate('click');
        expect(wrapper.instance().getValue()).toBe(4);
        expect(wrapper.find('span').first().hasClass('RatingOn')).toEqual(true);
        expect(wrapper.find('span').at(3).hasClass('RatingOn')).toEqual(true);
        expect(wrapper.find('span').at(4).hasClass()).toBeFalsy();
        expect(wrapper.state().rating).toBe(4);
        expect(wrapper.state().tmpRating).toBe(4);
    });
});