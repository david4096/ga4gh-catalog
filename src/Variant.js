import React, { Component } from 'react';
import ID from './ID.js'
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Variant extends Component {
  constructor(props) {
    super(props)
    console.log(this.props);
    if (this.props.variant) {
      this.state = {
        variant: this.props.variant
      }
    } else {
      this.state = {
        variant: this.props.params.variant
      }
    }
  }
  render() {
    var name = this.state.variant.names;
    var refBases = "", rb;
    for (rb in this.props.referenceBases){
      refBases = refBases.concat(" ", this.props.referenceBases[rb]);
    }
    if (name == ""){
        name = "N/A";
    }
    return (
      <tr>
        <td><Link to={'/variants/'+ this.state.variant.id }>{name}</Link></td>
        <td>{this.state.variant.referenceName}</td>
        <td><ID id={this.state.variant.id} /></td>
        <td>{this.state.variant.start}</td>
        <td>{this.state.variant.end}</td>
        <td>{this.state.variant.referenceBases}</td>
        <td>{this.state.variant.alternateBases}</td>
      </tr>
    )
  }
}
