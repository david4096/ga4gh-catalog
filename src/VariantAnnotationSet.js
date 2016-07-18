import React, { Component } from 'react';
import Variant from './Variant.js'

export default class VariantAnnotationSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h3>Variant annotation set</h3>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
        <div>refId: {this.props.referenceSetId}</div>
      </div>
    )
  }
}
