import React from 'react';

import Excel  from '../components/Excel';
import schema from '../util/schema';
import { mount } from 'enzyme';

/** LOAD DATA */
let data = [{}];
schema.forEach(item => data[0][item.id] = item.sample);

describe('Editing data', () => {
    it('saves new data', () => {
        const callback = jest.fn();
        const table = mount(
            <Excel 
                schema={schema}
                initialData={data}
                onDataChange={callback}
            />
        );

        //console.log(table.find('td').first().text());
        //New name for the cell
        const newName = 'The Comeback';
        table.find('td').first().simulate('doubleClick');

        //Change the value with the new name and submit the form
        table.find('td').first().find('input').first().instance().value = newName;
        table.find('td').first().find('form').first().simulate('submit');

        //console.log(table.find('td').first().text());

        expect(table.find('td').first().text()).toBe(newName);
        expect(callback.mock.calls[0][0][0].name).toBe(newName);
    });


    it('deletes data', () => {
        const callback = jest.fn();
        const table = mount(
            <Excel 
                schema={schema}
                initialData={data}
                onDataChange={callback}
            />
        );

        table.find('.ActionsDelete').first().simulate('click');
        table.find('.Button').first().simulate('click');
        expect(callback.mock.calls[0][0].length).toBe(0); 
    });
});