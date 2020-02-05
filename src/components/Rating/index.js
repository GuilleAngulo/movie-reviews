import classNames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.defaultValue,
            tmpRating: props.defaultValue,
        }
        this.reset = this.reset.bind(this);
    }

    getValue() {
        return this.state.rating;
    }

    //MOUSEOVER
    setTemp(rating) {
        this.setState({tmpRating: rating});
    }

    //CLICK
    setRating(rating) {
        this.setState({
            rating,
            tmpRating: rating,
        });
    }

    //MOUSEOUT
    reset() {
        this.setTemp(this.state.rating);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setRating(nextProps.defaultValue);
    }

    render() {
        const stars = [];
        for (let i = 1; i <= this.props.max; i++) {
            stars.push(
                <span 
                className={i <= this.state.tmpRating ? 'RatingOn' : null}
                key={i}
                onClick={!this.props.readonly ? this.setRating.bind(this, i) : undefined}
                onMouseOver={!this.props.readonly ? this.setTemp.bind(this, i) : undefined}
                >
                    &#9734;
                </span>  
            );
        }
        return(
            <div
            className={classNames({
                'Rating': true,
                'RatingReadOnly': this.props.readonly,
            })}
            onMouseOut={this.reset}
            >
                {stars}
                {this.props.readonly || !this.props.id ?
                null
                :
                <input
                type="hidden"
                id={this.props.id}
                value={this.state.rating ? this.state.rating : 0 } />
            }

            </div>
        );
    }
}

Rating.propTypes = {
    defaultValue: PropTypes.number,
    readonly: PropTypes.bool,
    max: PropTypes.number,
};

Rating.defaultProps = {
    defaultValue: 0,
    max: 5,
};

export default Rating;