import React, { Component } from 'react';
import $ from 'jquery'
import ID from './ID.js'
import Toggle from './Toggle.js'
import Reference from './Reference.js'

export default class ReferenceSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
      console.log(this.props);
    return (
      <div>
        <h1>Reference set: {this.props.name} (<ID id={this.props.id} />)</h1>
        <h3>{this.props.description}</h3>
        <div>{this.props.md5checksum} <span className="label label-primary">md5checksum</span></div>
        <div>{this.props.ncbiTaxonId} <span className="label label-primary">ncbiTaxonId</span></div>
        <div>{this.props.sourceUri} <span className="label label-primary">sourceUri</span></div>
        <Toggle text="reference set"/>
        <ListReferences baseurl={this.props.baseurl} referenceSetId={this.props.id} />
      </div>
    )
  }
}

class ListReferences extends Component {
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