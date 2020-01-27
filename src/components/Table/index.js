import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Search from '../Search';
import Toolbar from '../Toolbar';

import './styles.css';

let preSearchData = null;

const Table = ({ headers, initialData }) => {

    const [data, setData] = useState(initialData);
    const [sortBy, setSortBy] = useState(null);
    const [descending, setDescending] = useState(false);
    const [edit, setEdit] = useState(null); //[row-index, cell-index]
    const [search, setSearch] = useState(false);


    Table.propTypes = {
        headers: PropTypes.arrayOf(PropTypes.any),
        initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    };

    function sort(e) {
        const column = e.target.cellIndex;
        const isDescending = sortBy === column && !descending;
        const newData = [...data];
        newData.sort((a, b) => 
            isDescending ?
            a[column] < b[column] ? 1 : -1 
            :
            a[column] > b[column] ? 1 : -1 
        );
        setData(newData);
        setSortBy(column);
        setDescending(isDescending);
    }

    function showEditor(e) {
        setEdit({
            row: parseInt(e.target.dataset.row, 10),
            cell: e.target.cellIndex,
        });
    }

    function save(e) {
        e.preventDefault();
        const input = e.target.firstChild;
        const currentData = data.slice();
        currentData[edit.row][edit.cell] = input.value;
        setEdit(null);
        setData(currentData);
    }

    function toogleSearch() {
        if (search) {
            setData(preSearchData);
            setSearch(false);
            preSearchData = null;
        }
        else {
            preSearchData = data;
            setSearch(true);
        }

    }

    function doSearch(e) {
        const needle = e.target.value.toLowerCase();
        //search string deleted
        if (!needle) { 
            setData(preSearchData);
            return;
        }
        const index = e.target.dataset.index;
        const searchData = preSearchData.filter(row => row[index].toString().toLowerCase().indexOf(needle) > -1);
        setData(searchData);
    }



    /**function replay() {
        if (log.length === 0) {
            console.warn('No state to replay');
            return;
        }

        let index = -1;
        const interval = setInterval(() => {
            console.log('ENTRA REPLAY');
            index++;
            if (index === log.length - 1) {
                clearInterval(interval);
            }
            const state = log[index];
            setData(state.data);
            setSortBy(state.sortBy);
            setDescending(state.descending);
            setEdit(state.edit);
            setSearch(state.search);
        }, 1000);
    }**/



    
        return (
            <div>
                {console.log('Rendering Search Component...')}
                <Toolbar toogleSearch={toogleSearch} data={data} search={search} />
                <table>
                    <thead onClick={sort}>
                        <tr>
                            { headers.map((title, index) => 
                                {
                                    if(sortBy === index) {
                                        title += descending ? ' \u2191' : ' \u2193'
                                    }
                                    return (<th position={index} key={index}>{title}</th>);
                                }
                            )}
                        </tr>
                    </thead>
                    <tbody onDoubleClick={showEditor}>
                        <Search search={search} headers={headers} doSearch={doSearch} />
                        { 
                            data.map((row, rowIndex) => 
                                <tr key={rowIndex}>
                                    { row.map((cell, cellIndex) => {
                                        let content = cell;
                                        const actualEdit = edit;
                                        if (actualEdit && actualEdit.row === rowIndex && actualEdit.cell === cellIndex) {
                                            content = 
                                            <form onSubmit={save}>
                                                <input type="text" defaultValue={content} />
                                            </form>
                                        }
                                        return (
                                        <td key={cellIndex} data-row={rowIndex}>
                                            {content}
                                        </td>
                                        );
                                    }) }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="instructions">
                    <p>
                        <i>* Double click for cells edition, and press enter to save</i>
                    </p>
                </div>
            </div>
        );
}

export default Table;