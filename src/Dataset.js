import React, { Component } from 'react';
import $ from 'jquery'
import VariantSet from './VariantSet.js'

export default class Dataset extends Component {
  render() {
    return (
      <div>
      <h1>Dataset</h1>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
        <div><ListVariantSets {... this.props} datasetId={this.props.id} /></div>
      </div>
    )
  }
}

class ListVariantSets extends Component {
  constructor() {
    super()
    this.state = {
      variantSets: []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/variantsets/search", 
        type: "POST", data: JSON.stringify({datasetId: this.props.datasetId}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variantSets: this.state.variantSets.concat(result.variantSets)});
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
    let variantsets = this.state.variantSets;
    return (
      <div>
      <h2>Variant Sets</h2>
      {variantsets.map((variantset) => {
        return <VariantSet baseurl={this.props.baseurl} {... variantset} />
      })}
      </div>
    )
  }
}