import React, {Component} from 'react';
import classNames from 'classnames';
import { withTheme } from 'styled-components';

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
       CRUDActions.updateField(
        this.state.edit.row,
        this.state.edit.key,
        this.refs.input.getValue()
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
        const index = this.state.dialog && this.state.dialog.index;
        const first = this.state.data.get(index);
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
                    recordId={this.state.dialog.index}
                    readonly={readonly}
                />
            </Dialog>
        );
    }

    _renderTable() {

        
        const { shadow } = this.props.theme;

        return (
            <table
                style={{
                    boxShadow: shadow,
                }}
            >
                <thead>
                    <tr>
                        {this.schema.map(item => {
                            if (!item.show) return null
                            let title = item.label;

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

export default withTheme(Excel);