import React from 'react';
import Excel from './components/Excel';
import { data, headers } from './util/data';

function App() {
  return (
    <div className="App">
      <Excel headers={headers} initialData={data}/>
    </div>
  );
}

export default App;
