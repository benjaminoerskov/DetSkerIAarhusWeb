import * as React from 'react';
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
  public render() {
    return (
      <div className="App">
        <p className="App-intro">
          Homepage description here
        </p>
        <Link to="/feed">Click to go to feed</Link>
      </div>
    );
  }
}

export default HomePage;
