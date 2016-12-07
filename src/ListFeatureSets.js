import React, { Component } from 'react';
import $ from 'jquery'
import VariantSet from './FeatureSet.js'
import { Link } from 'react-router'

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
      <div className="greenContainer">
      {featureSets.map((featureSet) => {
        return <FeatureSet {... this.props} {... featureSet} />
      })}
      </div>
    )
  }
}
