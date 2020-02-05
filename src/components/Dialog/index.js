import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import classNames from 'classnames';
import './styles.css';

class Dialog extends Component {

   componentWillUnmount() {
       document.body.classList.remove('DialogModalOpen');
   }

   componentDidMount() {
       if (this.props.modal) {
           document.body.classList.add('DialogModalOpen');
       }

       //ESC FOR CLOSE
       document.onkeydown = (e) => {
            if (e.keyCode === 27) {
                console.log('ESC pressed.');
                document.body.classList.remove('DialogModalOpen');
                this.props.onAction('dismiss');
            }
       }
   }

   render() {
       return (
           <div className={classNames({
               'Dialog': true,
               'DialogModal': this.props.modal,
           })}>
                <div className={this.props.modal ? 'DialogModalWrap' : null}>
                    <div className="DialogHeader">{this.props.header}</div>
                    <div className="DialogBody">{this.props.children}</div>
                    <div className="DialogFooter">
                        {this.props.hasCancel ?
                            <span 
                                className="DialogDismiss"
                                onClick={this.props.onAction.bind(this, 'dismiss')}>
                                    Cancel
                            </span>
                            :
                            null
                        }
                        <Button onClick={this.props.onAction.bind(this,
                            this.props.hasCancel ? 'confirm' : 'dismiss')}>
                                {this.props.confirmLabel}
                        </Button>
                    </div>
                </div>
           </div>
       );
   }

}

Dialog.propTypes ={
    header: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string,
    modal: PropTypes.bool,
    onAction: PropTypes.func,
    hasCancel: PropTypes.bool,       
}

Dialog.defaultProps = {
    confirmLabel: 'ok',
    modal: false,
    onAction: () => {},
    hasCancel: true,
}

export default Dialog