import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Actions = props => 
    <div className="Actions">
        <span
            tabIndex="0"
            className="ActionsInfo"
            title="More Info"
            onClick={props.onAction.bind(null, 'info')}
            >
                <div className="icon-container">
                    <i className="fas fa-info"></i>
                    {/*&#8505;*/}
                </div>
        </span>
        <span
            tabIndex="0"
            className="ActionsEdit"
            title="Edit"
            onClick={props.onAction.bind(null, 'edit')}
            >
                <div className="icon-container">
                    <i className="fas fa-edit"></i>
                    {/*&#10000;*/}
                </div>
        </span>
        <span
            tabIndex="0"
            className="ActionsDelete"
            title="Delete"
            onClick={props.onAction.bind(null, 'delete')}
            >
                <div className="icon-container">
                    <i className="fas fa-ban"></i>
                </div>
        </span>
    </div>

Actions.propTypes = {
    onAction: PropTypes.func,
}

Actions.defaultProps = {
    onAction: () => {},
};

export default Actions;