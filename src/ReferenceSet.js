import React, { Component } from 'react';
import $ from 'jquery'
import ID from './ID.js'
import Reference from './Reference.js'
import { Link } from 'react-router'

export default class ReferenceSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <Link to={'/referencesets/'+this.props.id}>Reference set: {this.props.name}</Link>
        (<ID id={this.props.id} />)
        <div>{this.props.description}</div>
        <ListReferences baseurl={this.props.baseurl} referenceSetId={this.props.id} />
      </div>
    )
  }
}

export class ListReferences extends Component {
  constructor() {
    super()
    this.state = {
      references: []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/references/search", 
        type: "POST", data: JSON.stringify({
          referenceSetId: this.props.referenceSetId,
          pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({references: this.state.references.concat(result.references)});
          if (result.nextPageToken !== "") {
            //this.loadFromServer(result.nextPageToken)
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
      <div className="scrollable">
      <h3>References</h3>
      <table>
      <tr>
        <th>id</th>
        <th className="right">name</th>
        <th className="right">source Uri</th>
        <th className="right">source divergence</th>
        <th className="right">length</th>
        <th className="right">ncbi taxon ID</th>
        <th className="right">is derived</th>
        <th>md5checksum</th>
      </tr>
      {references.map((reference) => {
        return <Reference baseurl={this.props.baseurl} {... reference} />
      })}
      </table>
      </div>
    )
  }
}
