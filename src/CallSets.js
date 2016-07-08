import React, { Component } from 'react';
import $ from 'jquery'
import Variant from './Variant.js'
import VariantAnnotationSet from './VariantAnnotationSet.js'

export default class CallSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h3>Variant set</h3>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
        <div>refId: {this.props.referenceSetId}</div>
        <ListVariantAnnotationSets variantSetId={this.props.id} baseurl={this.props.baseurl} />
      </div>
    )
  }
}

class ListCallsets extends Component {
  constructor() {
    super()
    this.state = {
      callSetIds: []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/callsets/search",
        type: "POST", data: JSON.stringify({
          referenceName: "1",
          variantSetId: this.props.variantSetId,
          pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variants: this.state.callSetIds.concat(result.id)});
          if (result.nextPageToken !== "") {
            this.loadFromServer(result.nextPageToken)
          }
        },
        error: (xhr, status, err) => {
          console.log("variant error " + err);
        }
    });
  }
  componentDidMount() {
    this.loadFromServer();
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    let variants = this.state.variants;
    return (
      <div>
      <h2>Variants</h2>
      {variants.map((variant) => {
        return <Variant baseurl={this.props.baseurl} {... variant} />
      })}
      </div>
    )
  }
}