import React, { Component } from 'react';
import $ from 'jquery'
import Variant from './Variant.js'
import VariantAnnotationSet from './VariantAnnotationSet.js'
import ID from './ID.js'
import CallSet from './CallSet.js'
import Toggle from './Toggle.js'
import { Link } from 'react-router'

export default class VariantSet extends Component {
  render() {
    return (
      <div>
        <h2><Link to={'/variantsets/'+this.props.id}>Variant set: {this.props.name}</Link> (<ID id={this.props.id} />)</h2>
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

export class ListVariants extends Component {
  constructor() {
    super()
    this.state = {
      variants: [],
      referenceName: "",
      start: "",
      end: ""
    }
  }
  changedState(){
      return ((this.props.referenceName != this.state.referenceName)
              || (this.props.start != this.state.start)
              || (this.props.end != this.state.end));
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/variants/search", 
        type: "POST", data: JSON.stringify({
          start: this.props.start,
          end: this.props.end,
          referenceName: this.props.referenceName,
          variantSetId: this.props.variantSetId,
          pageSize: "20",
          pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variants: this.state.variants.concat(result.variants)});
          if (result.nextPageToken !== "") {
            //this.loadFromServer(result.nextPageToken)
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
    if (this.changedState()){
        this.setState({variants: []});
        this.loadFromServer();
        //console.log("refresh");
        //console.log("state: ", this.state.referenceName);
        //console.log("props: ", this.props.referenceName);
        this.state.referenceName = this.props.referenceName;
        this.state.start = this.props.start;
        this.state.end = this.props.end;
        console.log("changed");
    }
    let variants = this.state.variants;
    return (
      <div>
      <h2>Variants</h2>
      <table>
      <tr>
        <th>name</th>
        <th>ref</th>
        <th>id</th>
        <th>start</th>
        <th>end</th>
        <th>ref bases</th>
        <th>alternate bases</th>
      </tr>
      {variants.map((variant) => {
        return <Variant baseurl={this.props.baseurl} {... variant} />
      })}
      </table>
      </div>
    )
  }
}

export class ListMetadata extends Component {
    constructor() {
        super()
        this.state = {
        metadata: []
        }
    }
    loadFromServer() {
      let type = {'content-type': 'application/json'};
      this.serverRequest = $.ajax(
        { url: this.props.baseurl + "variantsets/" + this.props.variantSetId,
          type: "GET", data: JSON.stringify({}),
          dataType: "json",
          contentType: "application/json",
          success: (result) => {
            this.setState({metadata: result.metadata});
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
        return <div><h4>Metadata</h4>
            <Toggle text="metadata" defaultView="hide"/>
            <table>
            <tr>
                <th>description</th>
                <th className="IDcell">id</th>
                <th>#</th>
                <th>key</th>
                <th>value</th>
                <th>type</th>
            </tr>
            {this.state.metadata.map((meta) => {
             return <Metadata baseurl={this.props.baseurl} {... meta} keyValue={meta.key}/>
                
        })}</table>
        </div>
    }
}

export class Metadata extends Component {
    render() {
        //console.log("my metadata", this.props);
         return <tr>
                <td>{this.props.description}</td>
                <td className="IDcell"><ID id={this.props.id} /></td>
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