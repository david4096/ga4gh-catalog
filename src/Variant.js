import React, { Component } from 'react';

export default class Variant extends Component {
  render() {
    return (
      <div>
        <h3>Variant</h3>
        <div>name: {this.props.names}</div>
        <div>ref: {this.props.referenceName}</div>
        <div>id: {this.props.id}</div>
        <div>start: {this.props.start}</div>
        <div>end: {this.props.end}</div>
      </div>
    )
  }
}