import React, { Component } from 'react';
import ID from './ID.js'
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Navbar extends Component {
    
  render(){
    return(
      <ul>
        <li><a href="#dataset">Dataset</a></li>
        <li><a href="#variantsets">Variant Sets</a></li>
        <li><a href="#featuresets">Feature Sets</a></li>
        <li style={{float: "right"}}><a className="active" href="#about">About</a></li>
      </ul>
    )
  }
}