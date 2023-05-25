import React from 'react';
//import Login from './components/Login';
import Routes from './routes'
import './components/Articles/styles.css';

function App() {
  return (
    <div className="custom-scrollbar"> {/* Add the class name */}
      <div className="App">
      <Routes />
    </div>
    </div>
    
  );
}

export default App;
