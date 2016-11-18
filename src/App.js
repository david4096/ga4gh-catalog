import React, { Component } from 'react';
import $ from 'jquery'
import Dataset from './Dataset.js'
import ReferenceSet from './ReferenceSet.js'
import { Link } from 'react-router'

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
        type: "POST", data: JSON.stringify({}),
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

class Nav extends Component {
  render() {
    return (
        <div className="navbar navbar-dark bg-inverse">
              <a className="navbar-brand" href="#">GA4GH Catalog</a>
              <ul className="nav navbar-nav">
                <li className="nav-item active">
                  <input type="text" className="nav-link urlbox" value={this.props.baseurl} /> <span className="sr-only">(current)</span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
            </div>
    )
  }
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      baseurl: "http://1kgenomes.ga4gh.org/"
    }
  }
  render() {
    let baseurl = this.state.baseurl;
    return (
      <div>
      <Nav baseurl={baseurl} />
      <div className="container">
        <ListReferenceSets baseurl={baseurl}/>
        <ListDatasets baseurl={baseurl}/>
      </div>
      </div>
    );
  }
}
