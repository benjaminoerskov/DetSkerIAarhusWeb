import * as React from 'react';
import { Link } from 'react-router-dom'

class About extends React.Component {
  public render() {
    return (
      <div className="App">
        <p className="App-intro">
          Her kan man bare lige læse at det er mig der har lavet det...
        </p>
        <Link to="/feed">Tryk her for at komme hen til det dejlige</Link>
      </div>
    );
  }
}

export default About;