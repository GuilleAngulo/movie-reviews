import React from 'react';

import Pad from './components/Pad';
import schema from './util/schema';
import CRUDStore from './flux/CRUDStore';

//import Table from './components/Table';
//import { data, headers } from './util/data';


/**let data = JSON.parse(localStorage.getItem('data') || '');

if (!data) {
  data = {};
  schema.forEach(item => data[item.id] = item.sample);
  data = [data];
}**/


CRUDStore.init(schema);

function App() {
  return (
    <div>
     {/** <Pad schema={schema} initialData={data} /> */} 
     <Pad />
    </div>
  );
}


export default App;

