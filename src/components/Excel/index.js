import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import classNames from 'classnames';

import Actions from '../Actions';
import Dialog from '../Dialog';
import Form from '../Form';
import FormInput from '../FormInput';
import Rating from '../Rating';

import CRUDStore from '../../flux/CRUDStore';

import './styles.css';
import CRUDActions from '../../flux/CRUDActions';

class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //data: this.props.initialData,
            data: CRUDStore.getData(),
            sortby: null,
            descending: false,
            edit: null,
            dialog: null,
        }
        
        this.schema = CRUDStore.getSchema();
        
        CRUDStore.addListener('change', () => {
            this.setState({
                data: CRUDStore.getData(),
            });
        });
    }

    /**
     --- OLD VERSION WITHUT FLUX ---
    _deleteConfirmationClick(action) {
        if (action === 'dismiss') {
            this._closeDialog();
            return;
        }
        let data = Array.from(this.state.data);
        data.splice(this.state.dialog.index, 1);
        this.setState({
            dialog: null,
            data,
        });
        this._fireDataChange(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.initialData});
    }

    _fireDataChange(data) {
        this.props.onDataChange(data);
    }
    

    _sort(key) {
        let data = Array.from(this.state.data);
        const descending = this.state.sortby === key && !this.state.descending;
        data.sort((a, b) => {
            return descending ?
                (a[key] < b[key] ? 1 : -1)
                :
                (a[key] > b[key] ? 1 : -1)
        });
        this.setState({
            data,
            sortby: key,
            descending,
        });
        //this._fireDataChange(data);
    }

    
    _save(e) {
        e.preventDefault();
        const value = this.refs.input.getValue();
        let data = Array.from(this.state.data);
        data[this.state.edit.row][this.state.edit.key] = value;
        this.setState({
            edit: null,
            data,
        });
        this._fireDataChange(data);
    }

      _saveDataDialog(action) {
        if (action === 'dismiss') {
            this._closeDialog();
            return;
        }
        let data = Array.from(this.state.data);
        data[this.state.dialog.index] = this.refs.form.getData();
        this.setState({
            dialog: null,
            data,
        });
        this._fireDataChange(data);
    }
    */

   _sort(key) {
    const descending = this.state.sortby === key && !this.state.descending;
    CRUDActions.sort(key, descending);
    this.setState({
        sortby: key,
        descending,
    });
   }

   _save(e) {
       e.preventDefault();
       //invariant(this.state.edit, 'Messed up edit state');
       CRUDActions.updateField(
        this.state.edit.row,
        this.state.edit.key,
        this.refs.imput.getValue()
       );

       this.setState({
           edit: null,
       });
   }

    _showEditor(e) {
        this.setState(
            {edit: {
                row: parseInt(e.target.dataset.row, 10),
                key: e.target.dataset.key,
            }
        });
    }


    _actionClick(rowIndex, action) {
        this.setState({dialog: {type: action, index: rowIndex}});
    }

   _deleteConfirmationClick(action) {
       this.setState({dialog: null});
       if (action === 'dismiss') {
           return;
       }
       const index = this.state.dialog && this.state.dialog.index;
       //invariant(typeof index === 'number', 'Unexpected dialog state');
       CRUDActions.delete(index);
   }

    _closeDialog() {
        this.setState({dialog: null});
    }

    _saveDataDialog(action) {
        this.setState({dialog: null});
        if (action === 'dismiss') {
            return;
        }

        const index = this.state.dialog && this.state.dialog.index;
        //invariant(typeof index == 'number', 'Unexpected dialog state');
        CRUDActions.updateRecord(index, this.refs.form.getData());
    }

    render() {
        return (
            <div className="Excel">
                {this._renderTable()}
                {this._renderDialog()}
            </div>
        );
    }

    _renderDialog() {
        if (!this.state.dialog) {
            return null;
        }

        const type = this.state.dialog.type;
        switch (type) {
            case 'delete':
              return this._renderDeleteDialog();
            case 'info':
              return this._renderFormDialog(true);
            case 'edit':
              return this._renderFormDialog();
            default:
              throw Error(`Unexpected dialog type ${type}`);
          }
    }

    _renderDeleteDialog() {
        const first = this.state.data[this.state.dialog.index];
        const nameguess = first[Object.keys(first)[0]];
        return (
            <Dialog
                modal={true}
                header="Confirm deletion"
                confirmLabel="Delete"
                onAction={this._deleteConfirmationClick.bind(this)}
            >
                {`Are you sure you want to delete "${nameguess}"?`}
            </Dialog>
        );
    }

    _renderFormDialog(readonly) {
        return (
            <Dialog
                modal={true}
                header={readonly ? 'Item info' : 'Edit item'}
                confirmLabel={readonly ? 'ok' : 'Save'}
                hasCancel={!readonly}
                onAction={this._saveDataDialog.bind(this)}
            >
                <Form 
                    ref="form"
                    //fields={this.schema}
                    //fields={this.props.schema}
                    //initialData={this.state.data[this.state.dialog.index]}
                    recordId={this.state.dialog.index}
                    readonly={readonly}
                />
            </Dialog>
        );
    }

    _renderTable() {
        return (
            <table>
                <thead>
                    <tr>
                        {/** {this.props.schema.map(item => {*/}
                        {this.schema.map(item => {
                            if (!item.show) return null
                            let title = item.label;
                            /*if (this.state.sortby === item.id) 
                                title += this.state.descending ? ' \u2191' : ' \u2193';*/

                            let arrow;
                            if (this.state.sortby === item.id)
                                arrow = this.state.descending ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>;

                            return (
                                <th
                                    className={`schema-${item.id}`}
                                    key={item.id}
                                    onClick={this._sort.bind(this, item.id)}
                                >
                                    {title}
                                    {' '}
                                    {arrow}
                                
                                </th>
                            );
                        })}
                        <th className="ExcelNotSortable">Actions</th>
                    </tr>
                </thead>
                <tbody onDoubleClick={this._showEditor.bind(this)}>
                        {this.state.data.map((row, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {Object.keys(row).map((cell, index) => {
                                        //const schema = this.props.schema[index];
                                        const schema = this.schema[index];
                                        if (!schema || !schema.show) {
                                            return null;
                                        }
                                        const isRating = schema.type === 'rating';
                                        const edit = this.state.edit;
                                        let content = row[cell];
                                        if (!isRating && edit && edit.row === rowIndex 
                                            && edit.key === schema.id) {
                                                content = (
                                                    <form onSubmit={this._save.bind(this)}>  
                                                        <FormInput 
                                                            ref="input"
                                                            {...schema}
                                                            defaultValue={content} 
                                                        />
                                                    </form>
                                                );
                                            } else if (isRating) {
                                                content = 
                                                <Rating 
                                                    readonly={true}
                                                    defaultValue={Number(content)}
                                                />;
                                            }
                                            return (
                                                <td
                                                    className={classNames({
                                                        [`schema-${schema.id}`]: true,
                                                        'ExcelEditable': !isRating,
                                                        'ExcelDataLeft': schema.align === 'left',
                                                        'ExcelDataRight': schema.align === 'right',
                                                        'ExcelDataCenter': schema.align !== 'left' && schema.align !== 'right',
                                                    })}    
                                                    key={index}
                                                    data-row={rowIndex}
                                                    data-key={schema.id}
                                                >
                                                    {content}
                                                </td>
                                            );
                                    }, this)}
                                    <td className="ExcelDataCenter">
                                        <Actions 
                                            onAction={this._actionClick.bind(this, rowIndex)}
                                        />
                                    </td>
                                </tr>
                            );
                        }, this)}
                </tbody>
            </table>
        );
    }
}

/** 
Excel.propTypes = {
    schema: PropTypes.arrayOf(
        PropTypes.object
    ),
    initialData: PropTypes.arrayOf(
        PropTypes.object
    ),
    onDataChange: PropTypes.func,
}
*/

export default Excel