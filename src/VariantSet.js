import React, { Component } from 'react';
import $ from 'jquery'
import Variant from './Variant.js'
import VariantAnnotationSet from './VariantAnnotationSet.js'
import ID from './ID.js'
import Toggle from './Toggle.js'
import { Link } from 'react-router'
import { SelectReferences } from './ReferenceSet.js'

export default class VariantSet extends Component {
  render() {
    return (
      <div>
        <h2><Link to={'/variantsets/'+this.props.id}>Variant set: {this.props.name}</Link></h2> <h4> (<ID id={this.props.id} />) </h4>
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
      end: "",
      currPage: 0,
      largestPage: 0,
      pageTokens: [null]
    }
  }
  changedParamsState(){
    return ((this.props.referenceName != this.state.referenceName)
      || (this.props.start != this.state.start)
      || (this.props.end != this.state.end));
  }
  changedPageState(){
    return (this.props.currPage != this.state.currPage);
  }
  loadFromServer(pageToken=this.state.pageTokens[this.props.currPage]) {
      console.log("refName", this.props.referenceName);
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
          if (this.state.largestPage == this.state.currPage && !this.state.pageTokens.includes(result.nextPageToken))
            this.setState({pageTokens: this.state.pageTokens.concat(result.nextPageToken)});
          console.log("curr pages: ", this.state.pageTokens);
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
    if (this.changedParamsState() || this.changedPageState()){
      this.setState({variants: []});
      this.state.currPage = this.props.currPage;
      if (this.state.currPage > this.state.largestPage){
        this.state.largestPage = this.state.currPage;
      }
      console.log("currPage ", this.state.currPage);
      console.log("largest page ", this.state.largestPage);
    if (!this.changedPageState() && this.changedParamsState()){ //if only search terms changed
      this.state.pageTokens = [null]; //reset all page-related variables
      this.state.largestPage = 0;
      this.state.currPage = 0;
      console.log("reset");
    }
    this.loadFromServer();
    this.state.referenceName = this.props.referenceName;
    this.state.start = this.props.start;
    this.state.end = this.props.end;
    }
    
    /*if (this.changedPageState()){
      this.state.currPage = this.props.currPage;
    }*/

    let variants = this.state.variants;
    return (
      <div>
      <h2>Variants (page: {this.state.currPage})</h2>
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
        return <div>
            <h4>Metadata</h4>
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

export class SearchVariants extends Component {
  constructor() {
    super()
    this.state = {
      data: "",
      refName: "",
      start: "",
      end: "",
      currPage: 0
    }
  }
  searchVariants(){ //re-initializes search parameters based on HTML input form
    this.setState({currPage: 0});
    var refName = document.getElementById("refName").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    this.setState({refName: refName});
    this.setState({start: start});
    this.setState({end: end});
    //console.log("ref name", this.state.refName);
  }
  updateCurrentPage(p){
    if (this.state.currPage + p >= 0)
      this.state.currPage = this.state.currPage + p;
    console.log("currPage: ", this.state.currPage);
  }
  render() {
    let data = this.state.data;
    return (
      <span>
        <div>
          <span className="searchBar">reference name: </span>
          <SelectReferences id="refName" layout="variants"/>
          <span className="searchBar">start: <input id="start" size="12" defaultValue="0" type="text"/></span>
          <span className="searchBar">end: <input size="12" id="end" defaultValue="4294967295" type="text"/>
            </span>
          <input onClick={()=>this.searchVariants()} type="submit" value="Search"/>
          <button onClick={()=>this.updateCurrentPage(-1)} className="button"> &larr; </button>
          <button onClick={()=>this.updateCurrentPage(1)} className="button"> &rarr; </button>
        </div>
        <ListVariants baseurl={this.props.baseurl} variantSetId={this.props.id} referenceName={this.state.refName} start={this.state.start} end={this.state.end} currPage={this.state.currPage} />
      </span>
    )
  }
}
