import React, { Component } from 'react';
import Variant from './Variant.js'
import Toggle from './Toggle.js'
import ID from './ID.js'

export default class VariantAnnotationSet extends Component {
  render() {
      console.log("vas", this.props);
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h3>Variant Annotation Set</h3>
        <div>{this.props.name} <span className="label label-primary">name</span></div>
        <div><ID id={this.props.id} /> <span className="label label-primary">id</span></div>
      </div>
    )
  }
}