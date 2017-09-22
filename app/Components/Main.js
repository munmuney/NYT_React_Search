import React from "react";
import { Link } from "react-router";


class Main extends React.Component {
  render() {
    const style={
      marginLeft:20
    }
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#"><i style={style} className="fa fa-newspaper-o" aria-hidden="true"></i></a>
            <ul id="nav-mobile" className="right">
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/saved">Saved Articles</Link></li>
            </ul>
          </div>
        </nav>

        <div className="container">


          <div className="section">
            <h2 className="center-align"><strong><i className="fa fa-newspaper-o" aria-hidden="true"></i> NYT REACT</strong></h2>
          </div>

          {this.props.children}

        </div>
      </div>

    )   
  }
}



export default Main;
