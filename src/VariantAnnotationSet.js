import React, { Component } from 'react';
import Variant from './Variant.js'
import Toggle from './Toggle.js'
import ID from './ID.js'

export default class VariantAnnotationSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h3>Variant Annotation Set</h3>
        <div>name: {this.props.name}</div>
        <div><ID id={this.props.id} /></div>
        <div>refId: {this.props.referenceSetId}</div>
      </div>
    )
  }
}