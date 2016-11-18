import React, { Component } from 'react';
import $ from 'jquery'
import ID from './ID.js'
import Reference from './Reference.js'
import { Link } from 'react-router'

export default class ListReferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      references: []
    }
  }
  loadFromServer(pageToken=null) {
    console.log(this.props);
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.route.baseurl + "references/search", 
        type: "POST", data: JSON.stringify({
          referenceSetId: this.props.id,
          pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({references: this.state.references.concat(result.references)});
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
    let references = this.state.references;
    return (
      <div className="table-responsive">
      <table className="table table-striped">
      <thead>
        <th className="right">name</th>
        <th className="right">source Uri</th>
        <th className="right">source divergence</th>
        <th className="right">length</th>
        <th className="right">ncbi taxon ID</th>
        <th className="right">is derived</th>
        <th>md5checksum</th>
        <th>id</th>
      </thead>
      <tbody>
        {references.map((reference) => {
          return <Reference baseurl={this.props.baseurl} {... reference} />
        })}
      </tbody>
      </table>
      </div>
    )
  }
}
