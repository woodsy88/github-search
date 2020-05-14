import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Popular from './components/Popular';
import Battle from './components/Battle';

class App extends React.Component {
  // 1.state
  // 2.lifecycle
  
  render() {
    // 3.UI
    // render is the method that returns the UI
    // this is Javasript land for the UI
    
    return (
    <>
      <div className="container">
        <Battle />
        <Popular />
      </div>
    </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))