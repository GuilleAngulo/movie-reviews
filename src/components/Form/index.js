import React, {Component} from 'react';
//import PropTypes from 'prop-types';

import Rating from '../Rating';
import FormInput from '../FormInput';

import CRUDStore from '../../flux/CRUDStore';

import './styles.css';

class Form extends Component {
    
    fields;
    initialData;

    constructor(props) {
        super(props);
        this.fields = CRUDStore.getSchema();
        if ('recordId' in this.props) {
            this.initialData = CRUDStore.getRecord(this.props.recordId);
        }
    }
    
    
    getData(){
        let data = {};
        this.fields.forEach(field => 
            data[field.id] = this.refs[field.id].getValue()
        );
        return data;
    }
    render(){
        return(
            <form className="Form">
                {this.fields.map(field => {
                    const prefilled = this.initialData && this.initialData[field.id]; 
                    //WRITABLE
                    if (!this.props.readonly) {
                        return (
                            <div className="FormRow" key={field.id}>
                                <label 
                                    className="FormLabel"
                                    htmlFor={field.id}>
                                        {field.label}:
                                </label>
                                <FormInput {...field} ref={field.id} defaultValue={prefilled} />
                            </div>
                        );
                    }
                    //EMPTY
                    if (!prefilled) {
                        return null;
                    }
                    //READ-ONLY
                    return (
                        <div className="FormRow" key={field.id}>
                            <span className="FormLabel">{field.label}:</span>
                            {
                                field.type === 'rating' ?
                                    <Rating readonly={true}  defaultValue={parseInt(prefilled, 10)} />
                                    :
                                    <div>{prefilled}</div>
                            }
                        </div>
                    );

                }, this)}
            </form>
        );
    }
}

export default Form;