import React from 'react';
import Table from './components/Table';
import { data, headers } from './util/data';

function App() {
  return (
    <div className="App">
      <Table headers={headers} initialData={data}/>
    </div>
  );
}

export default App;
