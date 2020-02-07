import React, {Component} from 'react';
//import PropTypes from 'prop-types';

import Button from '../Button'; //For "add new item"
import Dialog from '../Dialog'; //For form of "add new item"
import Excel from '../Excel';
import Form from '../Form';

import './styles.css';

import CRUDStore from '../../flux/CRUDStore';
import CRUDActions from '../../flux/CRUDActions';

class Pad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //data: props.initialData,
            addnew: false,
            count: CRUDStore.getCount(),
        };

        CRUDStore.addListener('change', () => {
            this.setState({
                count: CRUDStore.getCount(),
            });
        });

        //this._preSearchData = null;
    }

    _addNewDialog() {
        this.setState({addnew: true});
    }


    /**
    --- OLD VERSION - WITHOUT FLUX ---

    _addNew(action) {
        if (action === 'dismiss') {
            this.setState({addnew: false});
            return;
        }

        let data = Array.from(this.state.data);
        data.unshift(this.refs.form.getData());
        this.setState({
            addnew: false,
            data,
        });
        this._commitToStorage(data);
    }
     */

     _addNew(action) {
         this.setState({addnew: false});
         if (action === 'confirm') {
             CRUDActions.create(this.refs.form.getData());
         }
     }

    _onExcelDataChange(data) {
        this.setState({ data });
        this._commitToStorage(data);
    }

    _commitToStorage(data) {
        localStorage.setItem('data', JSON.stringify(data));
    }

    _startSearching() {
        this._preSearchData = this.state.data;
    }

    _doneSearching() {
        this.setState({
            data: this._preSearchData,
        });
    }

    _search(e) {
        const needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this._preSearchData});
            return;
        }
        const fields = this.props.schema.map(item => item.id);
        const searchdata = this._preSearchData.filter(row => {
            for (let f = 0; f < fields.length; f++) {
                if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
                    return true;
                }
            }
            return false;
        });
        this.setState({data: searchdata});
    }

    shouldComponentUpdate(newProps, newState) {
        return (
            newState.addnew !== this.state.addnew ||
            newState.count !== this.state.count
        );
    }

    render() {
        return (
            <div className="Pad">
                <div className="PadToolbar">
                    <div className="PadToolbarAdd">
                        <Button
                            onClick={this._addNewDialog.bind(this)}
                            className="PadToolbarAddButton"
                        >
                            + add
                        </Button>
                    </div>
                    <div className="PadToolbarSearch">
                        <input 
                            placeholder={this.state.count === 1 
                                ?'Search 1 record ...'
                                : `Search ${this.state.count} records ...`
                            }
                            onChange={CRUDActions.search.bind(CRUDActions)}
                            onFocus={CRUDActions.startSearching.bind(CRUDActions)}
                            //onChange={this._search.bind(this)}
                            //onFocus={this._startSearching.bind(this)}
                            //onBlur={this._doneSearching.bind(this)}
                        />
                    </div>
                </div>
                <div className="PadDatagrid">
                    {/*<Excel 
                        schema={this.props.schema}
                        initialData={this.state.data}
                        onDataChange={this._onExcelDataChange.bind(this)}
                    />*/}
                    <Excel />
                </div>
                {this.state.addnew ?
                    <Dialog 
                        modal={true}
                        header="Add new item"
                        confirmLabel="Add"
                        onAction={this._addNew.bind(this)}
                    >
                        <Form 
                            ref="form"
                            //fields={this.props.schema}
                        />   
                    </Dialog>
                    :
                    null
                }
            </div>
        );
    }
}

/**
Pad.propTypes = {
    schema: PropTypes.arrayOf(
        PropTypes.object,
    ),
    initialData: PropTypes.arrayOf(
        PropTypes.object,
    ),
};
 */

export default Pad