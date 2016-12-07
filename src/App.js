import React, { Component } from 'react';
import { Link } from 'react-router'

class Nav extends Component {
  render() {
    return (
        <div className="navbar navbar-dark bg-inverse">
              <Link className="navbar-brand" to="/">GA4GH Catalog</Link>
              <ul className="nav navbar-nav">
                <li className="nav-item active">
                  <input type="text" className="nav-link urlbox" value={this.props.baseurl} /> <span className="sr-only">(current)</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/datasets">Datasets</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/referencesets">Reference Sets</Link>
                </li>
              </ul>
            </div>
    )
  }
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      baseurl: "http://localhost:8000/"
    }
  }
  render() {
    let baseurl = this.state.baseurl;
    return (
      <div>
        <Nav baseurl={baseurl} />
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
