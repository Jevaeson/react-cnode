import React, { Component } from 'react'
import '../static/gloable.css'
import Header from './Header/Header'
import Main from './Main/Main'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ backgroundColor: '#e1e1e1', paddingBottom: '20px' }}>
          <Header />
          <Main />
        </div>
      </Router>
    )
  }
}

export default App
