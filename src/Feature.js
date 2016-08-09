import React, { Component } from 'react';
import ID from './ID.js'
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Feature extends Component {
  render() {
    return (
      <tr>
        <td><Link to={'/variants/'+this.props.id}>{name}</Link></td>
        <td>{this.props.referenceName}</td>
        <td><ID id={this.props.id}/></td>
        <td>{this.props.start}</td>
        <td>{this.props.end}</td>
        <td>{refBases}</td>
        <td>{this.props.alternateBases[0]}</td>
      </tr>
    )
  }
}