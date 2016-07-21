import React, { Component } from 'react';
import $ from 'jquery'
import Variant from './Variant.js'
import VariantAnnotationSet from './VariantAnnotationSet.js'
import ID from './ID.js'
import CallSet from './CallSet.js'
import Toggle from './Toggle.js'

export default class VariantSet extends Component {
  render() {
      //console.log("metadata: ", this.props);
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h2>Variant set</h2>
        <div>{this.props.name} <span className="label label-primary">name</span> </div>
        <div><ID id={this.props.id} /> <span className="label label-primary">id</span></div>
        <div><ID id={this.props.referenceSetId} /> <span className="label label-primary">refId</span></div>
        <Toggle />
        <ListMetadata metadata={this.props.metadata}/>
        <ListVariantAnnotationSets variantSetId={this.props.id} baseurl={this.props.baseurl} />
      </div>
    )
  }
}

class ListVariantAnnotationSets extends Component {
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
          //console.log(result);
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

class ListVariants extends Component {
  constructor() {
    super()
    this.state = {
      variants: []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/variants/search", 
        type: "POST", data: JSON.stringify({
          start: 0,
          end: Math.pow(2,32) - 1,
          callSetIds: this.props.callSetIds,
          referenceName: "1",
          variantSetId: this.props.variantSetId,
          pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variants: this.state.variants.concat(result.variants)});
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
    let variants = this.state.variants;
    console.log(variants.length)
    return (
      <div>
      <h2>Variants</h2>
      {variants.map((variant) => {
        return <Variant baseurl={this.props.baseurl} {... variant} />
      })}
      </div>
    )
  }
}

class ListMetadata extends Component {
    constructor() {
        super()
        this.state = {
        metadata: []
        }
    }
    
    render() {
        return <div><h4>Metadata</h4>
            <table>
            <tr>
                <th>description</th>
                <th>id</th>
                <th>#</th>
                <th>key</th>
                <th>value</th>
                <th>type</th>
            </tr>
            {this.props.metadata.map((meta) => {
             return <Metadata baseurl={this.props.baseurl} {... meta} keyValue={meta.key}/>
                
        })}</table>
        </div>
    }
}

class Metadata extends Component {
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

class ListCallSets extends Component {
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