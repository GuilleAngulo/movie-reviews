import React, {useContext} from 'react';
import PropTypes from 'prop-types';


import styled, { ThemeContext } from 'styled-components';
import './styles.css';

const Actions = props => {
    const { background, shadow, shadowpress, icon, iconGlow } = useContext(ThemeContext);

    const IconContainer = styled.div`
        background: ${background};
        box-shadow: ${shadow};
        &:active {
            box-shadow: ${shadowpress};
        }
    `;

    return ( 
    <div 
        className="Actions"
        style={{
            background,
        }}
    >
        <span
            tabIndex="0"
            className="ActionsInfo"
            title="More Info"
            onClick={props.onAction.bind(null, 'info')}
            >
                <IconContainer 
                className="icon-container"
                >
                    <i 
                    className="fas fa-info"
                    style={{
                        color: icon,
                        textShadow: iconGlow,
                    }} 
                    />
                </IconContainer>
        </span>
        <span
            tabIndex="0"
            className="ActionsEdit"
            title="Edit"
            onClick={props.onAction.bind(null, 'edit')}
            >
                <IconContainer 
                className="icon-container"
                >
                    <i 
                    className="fas fa-edit"
                    style={{
                        color: icon,
                        textShadow: iconGlow,

                    }} 
                    />
                </IconContainer>
        </span>
        <span
            tabIndex="0"
            className="ActionsDelete"
            title="Delete"
            onClick={props.onAction.bind(null, 'delete')}
            >
                <IconContainer 
                className="icon-container"
                >
                    <i 
                    className="fas fa-ban"
                    style={{
                        color: icon,
                        textShadow: iconGlow,
                    }} 
                    />
                </IconContainer>
        </span>
    </div>
    );
}

Actions.propTypes = {
    onAction: PropTypes.func,
}

Actions.defaultProps = {
    onAction: () => {},
};

export default Actions;