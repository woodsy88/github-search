import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Popular from './components/Popular';
import Battle from './components/Battle';
import Nav from './components/Nav';

import { ThemeProvider } from './contexts/theme'

class App extends React.Component {
  // 1.state
  // 2.lifecycle

  constructor(props) {
    super(props)
    
    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }

  render() {
    // 3.UI
    // render is the method that returns the UI
    // this is Javasript land for the UI
    
    return (
    <>
     <ThemeProvider value={this.state}>
       <div className={this.state.theme}>
          <div className="container">
            <Nav />
            <Battle />
            <Popular />
          </div>
       </div>
     </ThemeProvider>
    </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))