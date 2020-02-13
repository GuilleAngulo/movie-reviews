import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

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

        const { shadowpress, background, text } = this.props.theme;


        //PROPS FOR ALL ELEMENTS
        const common = {
            id: this.props.id,
            ref: 'input',
            defaultValue: this.props.defaultValue,
            placeholder: this.props.placeholder,
            onChange: this.props.onChange,
            onFocus: this.props.onFocus,
            list: this.props.list,
        };
        switch (this.props.type) {
            case 'year':
                return (
                    <input
                    {...common}
                    style={{
                        background,
                        boxShadow: shadowpress,
                        color: text,
                    }}
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
                return <textarea {...common} style={{boxShadow: shadowpress}}/>;
            default:
                return <input {...common} 
                            style={{
                                background,
                                boxShadow: shadowpress,
                                color: text,
                            }} 
                            type="text" />;
        }

    }
}

FormInput.propTypes = {
    type: PropTypes.oneOf(['year', 'suggest', 'rating', 'text', 'input']),
    id: PropTypes.string,
    options: PropTypes.array,
    defaultValue: PropTypes.any,
}

export default withTheme(FormInput)