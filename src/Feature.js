import React, { Component } from 'react';
import ID from './ID.js'
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Feature extends Component {
  render() {
    return (
      <tr>
        <td><Link to={'/features/'+this.props.id}>{this.props.name}</Link></td>
        <td>{this.props.id}</td>
        <td>{this.props.strand}</td>
        <td>{this.props.start}</td>
        <td>{this.props.end}</td>
        <td>{this.props.geneSymbol}</td>
      </tr>
    )
  }
}