import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styled, { ThemeContext } from 'styled-components';
import './styles.css';

const Button = props => {

    const { background, shadow, shadowpress, text } = useContext(ThemeContext);

    const ButtonLink = styled.a`
        background: ${background};
        box-shadow: ${shadow};
        color: ${text};
        &:active {
            box-shadow: ${shadowpress};
        }
    `;

    const ButtonDefault = styled.button`
        background: ${background};
        box-shadow: ${shadow};
        color: ${text};
        &:active {
            box-shadow: ${shadowpress};
        }
    `;
    
        return (
            props.href ?
            <ButtonLink {...props} className={classNames('Button', props.className)}> {props.children} </ButtonLink>
            :
            <ButtonDefault {...props} className={classNames('Button', props.className)} >{props.children}</ButtonDefault>
        );

}

Button.propTypes = {
    href: PropTypes.string,
};


export default Button;