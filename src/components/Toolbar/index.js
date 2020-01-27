import React from 'react';
import './styles.css';

const Toolbar = ({ toogleSearch, data, search }) => {
    
    function download(format, e) {
        const contents = format === 'json' ? 
        JSON.stringify(data) 
        : 
        data.reduce((result, row) => {
            return result +
                row.reduce((rowresult, cell, index) => {
                    return rowresult  
                    + '"'
                    + cell.replace(/"/g, '""')
                    + '"'
                    + (index < row.length - 1 ? ',' : '');
                }, '') + "\n";
        }, '');

        const URL = window.URL || window.webkitURL;
        const blob = new Blob([contents], { type: 'text/' + format});
        e.target.href = URL.createObjectURL(blob);
        e.target.download = 'data.' + format;
    }

    return (
        <div className="toolbar">
            <button onClick={toogleSearch} >
                {console.log('Rendering Toolbar Component...')}
                { search ? 'Searching' : 'Search' }
            </button>
            <a href="data.json" onClick={(e) => download('json', e)}>
                Export JSON
            </a>
            <a href="data.csv" onClick={(e) => download('csv', e)}>
                Export CSV
            </a>
        </div>
    );
    
}

export default Toolbar;