import React from 'react';
import './App.css';
import { SearchArea } from './Components/SearchArea';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <h1>
          Search Countries
        </h1>

        <div className="container">
          <SearchArea />
        </div>
    </div>
  );
}

export default App