import { useEffect, useState } from 'react';
import axios from 'axios';
import Accordions from './components/ally-accordians';

import './App.css';

function App() {

   const [data, setData] = useState([]);

   useEffect(() => {
        axios.get(`https://okrcentral.github.io/sample-okrs/db.json`)
        .then(res => {
          setData(res.data.data);
        })
   },[])

  return (
    <div className="Container">
      <Accordions data={data} />
    </div>
  );
}

export default App;
