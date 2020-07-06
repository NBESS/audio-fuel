import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Playlist } from './components/Playlist';
import Chill from './components/Chill';
import Blue from './components/Blue';
import Energized from './components/Energized';
import './App.css'


function App() {
  return (
    <Router>
      <div className="header">
        <h1>AudioFuel</h1>
        <nav className="mood-nav">
          <ul className="mood-list">
            <li className="mood-item mood-chill"><Link to='/chill'>Chill</Link></li>
            <li className="mood-item mood-energized"><Link to='/energized'>Energized</Link></li>
            <li className="mood-item mood-blue"><Link to='/blue'>Blue</Link></li>
          </ul>
        </nav>
      </div>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Playlist} />
          <Route path='/chill' component={Chill} />
          <Route path='/blue' component={Blue} />
          <Route path='/energized' component={Energized} />
        </Switch>
      </div >
    </Router >
  )
}

export default App;

