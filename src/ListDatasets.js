import React, { Component } from 'react';
import $ from 'jquery'
import VariantSet from './VariantSet.js'
import ReadGroupSet from './ReadGroupSet.js'
import FeatureSet from './FeatureSet.js'
import ID from './ID.js'
import { Link } from 'react-router'
import Feature from './Feature.js'
import Dataset from './Dataset.js'

export default class ListDatasets extends Component {
  constructor() {
    super()
    this.state = {
      datasets : []
    }
  }
  loadFromServer() {
    console.log(this.props);
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.route.baseurl + "datasets/search",
        type: "POST", data: JSON.stringify({pageToken: null}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({datasets: result.datasets});
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
    let datasets = this.state.datasets;
    return (
      <div>
      {datasets.map((dataset) => {
        return <Dataset {... this.props} dataset={dataset} key={dataset.id} />
      })}
      </div>
    )
  }
}
