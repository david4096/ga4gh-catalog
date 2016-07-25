import React, { Component } from 'react';
import ID from './ID.js'

export default class Variant extends Component {
  render() {
    var refBases = "", rb;
    for (rb in this.props.referenceBases)
    {
      refBases = refBases.concat(" ", this.props.referenceBases[rb]);
    }
      return (
      <tr>
        <td>{this.props.names}</td>
        <td>{this.props.referenceName}</td>
        <td><ID id={this.props.id} /></td>
        <td>{this.props.start}</td>
        <td>{this.props.end}</td>
        <td>{refBases}</td>
        <td>{this.props.alternateBases[0]}</td>
      </tr>
    )
  }
}