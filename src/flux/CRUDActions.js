import CRUDStore from './CRUDStore';
import {List} from 'immutable';

const CRUDActions = {

    create(newRecord) {
        /**let data = CRUDStore.getData();
        data.unshift(newRecord);
        CRUDStore.setData(data);**/
        CRUDStore.setData(CRUDStore.getData().unshift(newRecord));
    },

    delete(recordId) {
        let data = CRUDStore.getData();
        //data.splice(recordId, 1);
        //CRUDStore.setData(data);
        CRUDStore.setData(data.remove(recordId));
    },

    updateRecord(recordId, newRecord) {
        /**let data = CRUDStore.getData();
        data[recordId] = newRecord;
        CRUDStore.setData(data);**/
        CRUDStore.setData(CRUDStore.getData().set(recordId, newRecord));
    },

    updateField(recordId, key, value) {
        /**let data = CRUDStore.getData();
        data[recordId][key] = value;
        CRUDStore.setData(data);**/
        let record = CRUDStore.getData().get(recordId);
        record[key] = value;
        CRUDStore.setData(CRUDStore.getData().set(recordId, record));
    },

    _preSearchData: null,

    startSearching() {
        this._preSearchData = CRUDStore.getData();
    },

    search(e) {
        const target = e.target;
        const needle = target.value.toLowerCase();
        if (!needle) {
            CRUDStore.setData(this._preSearchData);
            return;
        }

        const fields = CRUDStore.getSchema().map(item => item.id);
        if (!this._preSearchData) {
            return;
        }
        
        const searchdata = this._preSearchData.filter(row => {
            for (let f = 0; f < fields.length; f++) {
                if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
                    return true;
                }
            }
            return false;
        });
        CRUDStore.setData(searchdata, /* commit */ false);
    },

    _sortCallback(a, b, descending) {
        let res = 0;
        if (typeof a === 'number' && typeof b === 'number') {
            res = a - b;
        } else {
            res = String(a).localeCompare(String(b));
        }

        return descending ? -1 * res : res;
    }, 

    sort(key, descending) {
        CRUDStore.setData(CRUDStore.getData().sort(
            (a,b) => this._sortCallback(a[key], b[key], descending)
        ));
    },
};

export default CRUDActions;