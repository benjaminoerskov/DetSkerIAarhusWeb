import * as React from 'react';
import { Link } from 'react-router-dom'

class AboutPage extends React.Component {
  public render() {
    return (
      <div className="App">
        <p className="App-intro">
          Aboutpage description
        </p>
        <Link to="/feed">Click to go to feed</Link>
      </div>
    );
  }
}

export default AboutPage;