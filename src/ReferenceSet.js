import React, { Component } from 'react';
import $ from 'jquery'
import ID from './ID.js'
import Toggle from './Toggle.js'
import Reference from './Reference.js'
import { Link } from 'react-router'

export default class ReferenceSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h1><Link to={'/referencesets/'+this.props.id}>Reference set: {this.props.name} </Link></h1>
          <h2>(<ID id={this.props.id} />)</h2>
        <h3 style={{color:"#e520de"}}><i>{this.props.description}</i></h3>
        <Toggle text="reference set" defaultView="hide"/>
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

export class SelectReferences extends Component {
  constructor() {
    super()
    this.state = {
      view: "",
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
      
    //if in variants or feature view, search for references differently e.g. "chr1" for
    //features and "1" for variants
    if (this.props.layout == "variants"){
        this.state.prefix = "";
    }
    else if (this.props.layout == "features"){
        this.state.prefix = "chr";
    }
    return (
      <span>
      <select id={this.props.id}>
        <option value={this.state.prefix+"1"}>{this.state.prefix+"1"}</option>
        <option value={this.state.prefix+"2"}>{this.state.prefix+"2"}</option>
        <option value={this.state.prefix+"3"}>{this.state.prefix+"3"}</option>
        <option value={this.state.prefix+"4"}>{this.state.prefix+"4"}</option>
        <option value={this.state.prefix+"5"}>{this.state.prefix+"5"}</option>
        <option value={this.state.prefix+"6"}>{this.state.prefix+"6"}</option>
        <option value={this.state.prefix+"7"}>{this.state.prefix+"7"}</option>
        <option value={this.state.prefix+"8"}>{this.state.prefix+"8"}</option>
        <option value={this.state.prefix+"9"}>{this.state.prefix+"9"}</option>
        <option value={this.state.prefix+"10"}>{this.state.prefix+"10"}</option>
        <option value={this.state.prefix+"11"}>{this.state.prefix+"11"}</option>
        <option value={this.state.prefix+"12"}>{this.state.prefix+"12"}</option>
        <option value={this.state.prefix+"13"}>{this.state.prefix+"13"}</option>
        <option value={this.state.prefix+"14"}>{this.state.prefix+"14"}</option>
        <option value={this.state.prefix+"15"}>{this.state.prefix+"15"}</option>
        <option value={this.state.prefix+"16"}>{this.state.prefix+"16"}</option>
        <option value={this.state.prefix+"17"}>{this.state.prefix+"17"}</option>
        <option value={this.state.prefix+"18"}>{this.state.prefix+"18"}</option>
        <option value={this.state.prefix+"19"}>{this.state.prefix+"19"}</option>
        <option value={this.state.prefix+"20"}>{this.state.prefix+"20"}</option>
        <option value={this.state.prefix+"21"}>{this.state.prefix+"21"}</option>
        <option value={this.state.prefix+"22"}>{this.state.prefix+"22"}</option>
      </select>
      </span>
    )
  }
}
