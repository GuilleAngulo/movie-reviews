import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Rating from '../Rating';
import Suggest from '../Suggest';

import './styles.css';

class FormInput extends Component {

    getValue() {
        return 'value' in this.refs.input ?
            this.refs.input.value
            :
            this.refs.input.getValue();
    }

    render() {
        //PROPS FOR ALL ELEMENTS
        const common = {
            id: this.props.id,
            ref: 'input',
            defaultValue: this.props.defaultValue,
        };
        switch (this.props.type) {
            case 'year':
                return (
                    <input
                    {...common}
                    type="number"
                    defaultValue={this.props.defaultValue || new Date().getFullYear()}
                    />
                );
            case 'suggest':
                return <Suggest {...common} options={this.props.options} />;
            case 'rating': 
                return (
                    <Rating {...common} defaultValue={parseInt(this.props.defaultValue, 10)} />
                );
            case 'text':
                return <textarea {...common} />;
            default:
                return <input {...common} type="text" />;
        }

    }
}

FormInput.propTypes = {
    type: PropTypes.oneOf(['year', 'suggest', 'rating', 'text', 'input']),
    id: PropTypes.string,
    options: PropTypes.array,
    defaultValue: PropTypes.any,
}

export default FormInput