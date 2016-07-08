import React, { Component } from 'react';
import $ from 'jquery'
import Dataset from './Dataset.js'
import ReferenceSet from './ReferenceSet.js'

// load initial list of datasets

//datasets/search 
//pageToken: null,

//paths = {}
//paths.searchDatasets = "datasets/search"

class ListReferenceSets extends Component {
  constructor() {
    super()
    this.state = {
      referenceSets : []
    }
  }
  loadFromServer() {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/referencesets/search", 
        type: "POST", data: JSON.stringify({a: "b"}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({referenceSets: result.referenceSets});
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
    let referenceSets = this.state.referenceSets;
    return (
      <div>
      {referenceSets.map((referenceSet) => {
        return <ReferenceSet {... this.props} {... referenceSet} />
      })}
      </div>
    )
  }
}

class ListDatasets extends Component {
  constructor() {
    super()
    this.state = {
      datasets : []
    }
  }
  loadFromServer() {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/datasets/search",
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
        return <Dataset {... this.props} {... dataset} />
      })}
      </div>
    )
  }
}



export default class App extends Component {
  render() {
    return (
      <div>
        <ListReferenceSets baseurl="http://1kgenomes.ga4gh.org/"/>
        <ListDatasets baseurl="http://1kgenomes.ga4gh.org/"/>
      </div>
    );
  }
}