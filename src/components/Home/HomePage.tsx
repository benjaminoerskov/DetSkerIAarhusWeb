import * as React from 'react';
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
  public render() {
    return (
      <div className="App">
        <p className="App-intro">
          Her kan man bare lige se en dejlig homepage :3
        </p>
        <Link to="/feed">Tryk her for at komme hen til det dejlige</Link>
        
      </div>
    );
  }
}

export default HomePage;
