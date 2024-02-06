import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {MatchBackClient, Navbar} from './components';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />{' '}
        <Routes>
          <Route path='/match-back' element={<MatchBackClient />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
