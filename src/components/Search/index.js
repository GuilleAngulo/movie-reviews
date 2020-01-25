import React from 'react';
import './styles.css';

const Search = ({ search, _search, headers }) => {
    if (!search) {
        return null;
    }
    
    return (
        <tr onChange={_search}>
        { headers.map((ignore, index) => 
            <td key={index}>
                <input type="text" data-index={index} />
            </td>
        )}
        </tr>
    );
    
}

export default Search;