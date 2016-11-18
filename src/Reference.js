import React, { Component } from 'react'
import ID from './ID.js'

export default class Reference extends Component {
  render() {
    return (
      <tr>
        <td className="right">{this.props.name}</td>
        <td className="right">{this.props.sourceUri}</td>
        <td className="right">{this.props.sourceDivergence}</td>
        <td className="right">{this.props.length}</td>
        <td className="right">{this.props.ncbiTaxonId}</td>
        <td className="right">{this.props.isDerived}</td>
        <td className="number">{this.props.md5checksum}</td>
        <td><ID id={this.props.id} /></td>
      </tr>
    )
  }
}