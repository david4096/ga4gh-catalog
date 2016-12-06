import React, { Component } from 'react';
import $ from 'jquery'
import ReadGroupSet from './ReadGroupSet.js'
import { Link } from 'react-router'

export default class ListReadGroupSets extends Component {
  constructor() {
    super()
    this.state = {
      readgroupsets: [] 
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.route.baseurl + "readgroupsets/search", 
        type: "POST",
        data: JSON.stringify({datasetId: this.props.params.datasetId, pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          console.log(result)
          this.setState({readgroupsets: this.state.readgroupsets.concat(result.readGroupSets)});
          if (result.nextPageToken !== "") {
            this.loadFromServer(result.nextPageToken);
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
      <div className="scrollable">
      {readgroupsets.map((readgroupset) => {
        return <ReadGroupSet baseurl={this.props.baseurl} {... readgroupset} />
      })}
      </div>
    )
  }
}
