import React, { Component } from 'react';
import $ from 'jquery'
import Variant from './Variant.js'

export default class VariantSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h3>Variant set</h3>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
        <div>refId: {this.props.referenceSetId}</div>
      </div>
    )
  }
}

class ListVariants extends Component {
  constructor() {
    super()
    this.state = {
      variants: []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/variants/search", 
        type: "POST", data: JSON.stringify({
          start: 0,
          end: Math.pow(2,32) - 1,
          referenceName: "1",
          variantSetId: this.props.variantSetId,
          pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variants: this.state.variants.concat(result.variants)});
          if (result.nextPageToken != null) {
            this.loadFromServer(nextPageToken)
          }
        },
        error: (xhr, status, err) => {
          console.log(err);
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