import React, { Component } from 'react';
import $ from 'jquery'
import VariantSet from './VariantSet.js'
import ReadGroupSet from './ReadGroupSet.js'
import FeatureSet from './FeatureSet.js'
import ID from './ID.js'
import Toggle from './Toggle.js'

export default class Dataset extends Component {
  render() {
      //console.log("Dataset", this.props);
    return (
      <div>
        <h1>Dataset: {this.props.name} (<ID id={this.props.id} />)</h1>
        <h3>{this.props.description}</h3>
        <Toggle />
        <div><ListVariantSets {... this.props} datasetId={this.props.id} /></div>
        <div><ListFeatureSets {... this.props} datasetId={this.props.id} /></div>
        <div><h2>Read Group Sets</h2>
        <Toggle />
        <ListReadGroupSets {... this.props} datasetId={this.props.id} /></div></div>
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
        type: "POST",
        data: JSON.stringify({datasetId: this.props.datasetId, pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variantSets: this.state.variantSets.concat(result.variantSets)});
          if (result.nextPageToken != "") {
            this.loadFromServer(result.nextPageToken)
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
      {variantsets.map((variantset) => {
        return <VariantSet baseurl={this.props.baseurl} {... variantset} />
      })}
      </div>
    )
  }
}

class ListFeatureSets extends Component {
  constructor() {
    super()
    this.state = {
      featureSets : []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/featuresets/search",
        type: "POST", data: JSON.stringify({datasetId: this.props.datasetId, pageToken: pageToken}),
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({featureSets: this.state.featureSets.concat(result.featureSets)});
          if (result.nextPageToken != "") {
            this.loadFromServer(result.nextPageToken)
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
    let featureSets = this.state.featureSets;
    return (
      <div>
      {featureSets.map((featureSet) => {
        return <FeatureSet {... this.props} {... featureSet} />
      })}
      </div>
    )
  }
}

class ListReadGroupSets extends Component {
  constructor() {
    super()
    this.state = {
      readgroupsets: [] 
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/readgroupsets/search", 
        type: "POST",
        data: JSON.stringify({datasetId: this.props.datasetId, pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({readgroupsets: this.state.readgroupsets.concat(result.readGroupSets)});
          if (result.nextPageToken !== "") {
            //this.loadFromServer(result.nextPageToken);
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
    let readgroupsets = this.state.readgroupsets;
    return (
      <div>
      {readgroupsets.map((readgroupset) => {
        return <ReadGroupSet baseurl={this.props.baseurl} {... readgroupset} />
      })}
      </div>
    )
  }
}