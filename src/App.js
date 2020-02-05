import React from 'react';

import Pad from './components/Pad';
import schema from './util/schema';

//import Table from './components/Table';
//import { data, headers } from './util/data';

let data = JSON.parse(localStorage.getItem('data') || '');

if (!data) {
  data = {};
  schema.forEach(item => data[item.id] = item.sample);
  data = [data];
}

function App() {
  return (
    <div>
      <Pad schema={schema} initialData={data} />
    </div>
  );
}


export default App;

