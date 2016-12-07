import React, { Component } from 'react';
import $ from 'jquery'
import Dataset from './Dataset.js'
import ReferenceSet from './ReferenceSet.js'
import { Link } from 'react-router'

export default class ListReferenceSets extends Component {
  constructor() {
    super()
    this.state = {
      referenceSets : []
    }
  }
  loadFromServer() {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.route.baseurl + "referencesets/search", 
        type: "POST", data: JSON.stringify({}),
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({referenceSets: this.state.referenceSets.concat(result.referenceSets)});
          if (result.nextPageToken !== "") {
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
