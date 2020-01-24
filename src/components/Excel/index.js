import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Excel = ({ headers, initialData }) => {

    const [data, setData] = useState(initialData);
    const [sortBy, setSortBy] = useState(null);
    const [descending, setDescending] = useState(false);
    const [edit, setEdit] = useState(null);
    
    Excel.propTypes = {
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

        return (
            <table>
                <thead onClick={sort}>
                    <tr>
                        { headers.map((title, index) => 
                            {
                                if(sortBy === index) {
                                    title += descending ? ' \u2191' : ' \u2193'
                                }
                                return (<th key={index}>{title}</th>);
                            }
                        )}
                    </tr>
                </thead>
                <tbody onDoubleClick={showEditor}>
                    { 
                        data.map((row, rowIndex) => 
                        <tr key={rowIndex}>
                            {
                            row.map((cell, cellIndex) =>
                            <td key={cellIndex} data-row={rowIndex}>{cell}</td>) 
                            }
                        </tr>)
                    }
                </tbody>
            </table>
        );
}

export default Excel;