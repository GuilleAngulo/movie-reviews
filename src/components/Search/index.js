import React from 'react';
import './styles.css';

const Search = ({ search, headers, doSearch }) => {
    if (!search) {
        return null;
    }
    
    return (
        <tr onChange={doSearch}>
        {console.log('Rendering Search Component...')}
        { headers.map((ignore, index) => 
            <td key={index}>
                <input type="text" data-index={index} />
            </td>
        )}
        </tr>
    );
    
}

export default Search;