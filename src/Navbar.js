import React, { Component } from 'react';
import ID from './ID.js'
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Navbar extends Component {
    
  render(){
    return(
      <ul>
        <li style={{float: "right"}}><a className="active" href="#about"><Link to={'/about/'}>About</Link></a></li>
      </ul>
    )
  }
}