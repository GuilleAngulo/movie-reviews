import {EventEmitter} from 'fbemitter';
import {List} from 'immutable';

let data;
let schema;
const emitter = new EventEmitter();

const CRUDStore = {
    
    init(initialSchema) {
        schema = initialSchema;
        const storage = 'localStorage' in window ?
            localStorage.getItem('data')
            :
            null;
        if (!storage) {
            let initialRecord = {};
            schema.forEach(item => {
                initialRecord[item.id] = item.sample
            });
            data = List([initialRecord]);
        } else {
            data = List(JSON.parse(storage));
        }
    },

    addListener(eventType, fn) {
        emitter.addListener(eventType, fn);
    },
    
    getData() {
        return data;
    },
    //Data update at localstorage (or server) optional at commit
    setData(newData, commit = true) {
        data = newData;
        if (commit && 'localStorage' in window) {
            localStorage.setItem('data', JSON.stringify(newData));
        }
        emitter.emit('change');
    },

    //Schema doesn´t have get method, because is constant during all application
    getSchema() {
        return schema;
    },

    //Get count of total lines stored
    getCount() {
        //return data.length;
        return data.count();
    },

    //Get data from a specific line at storage
    getRecord(recordId) {
        //return recordId in data ? data[recordId] : null;
        return data.get(recordId);
    },
}

export default CRUDStore;