import React from 'react';
import './styles.css';

const Toolbar = ({ toogleSearch, search }) => {

    
    
    return (
        <button onClick={toogleSearch} className="toolbar">
            { search ? 'Searching' : 'Search' }
        </button>
    );
    
}

export default Toolbar;