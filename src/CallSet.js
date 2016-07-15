import React, { Component } from 'react';
import $ from 'jquery'
import Variant from './Variant.js'
import VariantAnnotationSet from './VariantAnnotationSet.js'

export default class CallSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
            <div>id: {this.props.id}</div>
      </div>
    )
  }
}
