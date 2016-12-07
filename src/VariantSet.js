import React, { Component } from 'react';
import $ from 'jquery'
import Variant from './Variant.js'
import VariantAnnotationSet from './VariantAnnotationSet.js'
import ID, { buttonID } from './ID.js'
import Toggle from './Toggle.js'
import { Link } from 'react-router'

export default class VariantSet extends Component {
  constructor(props) {
    super(props)
    if (this.props.params.variantSetId) {
      this.state = {
        variantSet: {id: this.props.params.variantSetId}
      }
    } else {
      this.state = {
        variantSet: this.props.variantSet
      }
    }
  }
  componentDidMount() {
    this.loadFromServer();
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.route.baseurl + "variantsets/" + this.state.variantSet.id, 
        type: "GET",
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variantSet: result});
        },
        error: (xhr, status, err) => {
          console.log(err);
        }
    });
  }
  render() {
    return (
      <div>
        <Link to={'/variantsets/' + this.state.variantSet.id}>Variant set: {this.state.variantSet.name}</Link>
        <ID id={this.state.variantSet.id} />
        <div>
          <Link to={'/variantsets/' + this.state.variantSet.id + '/variants/'}>Variants</Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}
export class ListVariantAnnotationSets extends Component {
  constructor() {
    super()
    this.state = {
      variantannotationsets: []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/variantannotationsets/search", 
        type: "POST",
        data: JSON.stringify({variantSetId: this.props.variantSetId, pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variantannotationsets: this.state.variantannotationsets.concat(result.variantAnnotationSets)});
          if (result.nextPageToken != "") {
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
    let variantannotationsets = this.state.variantannotationsets;
    return (
      <div>
      {variantannotationsets.map((variantannotationset) => {
        return <VariantAnnotationSet baseurl={this.props.baseurl} {... variantannotationset} />
      })}
      </div>
    )
  }
}



export class Metadata extends Component {
  render() {
    //console.log("my metadata", this.props);
    return <tr>
      <td>{this.props.description}</td>
      <td><ID id={this.props.id} /></td>
      <td>{this.props.number}</td>
      <td>{this.props.keyValue}</td>
      <td>{this.props.value}</td>
      <td>{this.props.type}</td>
      </tr>
    }
}

export class ListCallSets extends Component {
  constructor() {
    super()
    this.state = {
      callSets: [],
      callSetIds: []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/callsets/search",
        type: "POST", data: JSON.stringify({
          variantSetId: this.props.variantSetId,
          pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({callSets: this.state.callSets.concat(result.callSets)});
          if (result.nextPageToken !== "") {
            this.loadFromServer(result.nextPageToken)
          }
        },
        error: (xhr, status, err) => {
          console.log("variant error " + err);
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
    let callsets = this.state.callSets;
    let callsetids = this.state.callSetIds;
    {callsets.map((callset) => {
        callsetids.push(callset.id);
      })}
    return (
      <div>
        <ListVariants baseurl={this.props.baseurl} variantSetId={this.props.variantSetId}
        callSetIds={callsetids}/>
      </div>
    )
  }
}

