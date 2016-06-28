import React, { Component } from 'react';
import $ from 'jquery'

export default class ReferenceSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h3>Reference set</h3>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
        <div>refId: {this.props.referenceSetId}</div>
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
      <div>
      <h2>Variants</h2>
      {references.map((reference) => {
        return <Reference baseurl={this.props.baseurl} {... reference} />
      })}
      </div>
    )
  }
}

class Reference extends Component {
  render() {
    return (
      <div>
        <h3>Variant</h3>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
      </div>
    )
  }
}