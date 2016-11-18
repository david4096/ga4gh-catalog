import React, { Component } from 'react';
import $ from 'jquery'
import VariantSet from './VariantSet.js'
import ReadGroupSet from './ReadGroupSet.js'
import FeatureSet from './FeatureSet.js'
import ID from './ID.js'
import { Link } from 'react-router'
import Feature from './Feature.js'
import Dataset from './Dataset.js'

export default class SearchVariants extends Component {
  constructor() {
    super()
    this.state = {
      data: "",
      refName: "",
      start: "",
      end: "",
      pageSize: "",
      currPage: 0
    }
  }
  searchVariants(){
    this.setState({currPage: 0});
    var refName = document.getElementById("refName").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var pageSize = document.getElementById("pageSize").value;
    this.setState({refName: refName});
    this.setState({start: start});
    this.setState({end: end});
    this.setState({pageSize: pageSize});
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
          <span className="searchBar">reference name: <input id="refName" size="5" defaultValue="1" type="text"/></span>
          <span className="searchBar">start: <input id="start" size="12" defaultValue="0" type="text"/></span>
          <span className="searchBar">end: <input size="12" id="end" defaultValue="4294967295" type="text"/>
            </span>
          <span className="searchBar">pageSize: <input size="4" id="pageSize" defaultValue="30" type="text"/>
            </span>
          <input onClick={()=>this.searchVariants()} type="submit" value="Search"/>
          <button onClick={()=>this.updateCurrentPage(-1)} className="button"> &larr; </button>
          <button onClick={()=>this.updateCurrentPage(1)} className="button"> &rarr; </button>
        </div>
        <ListVariants baseurl={this.props.baseurl} variantSetId={this.props.id} referenceName={this.state.refName} start={this.state.start} end={this.state.end} pageSize={this.state.pageSize} currPage={this.state.currPage} />
      </span>
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
      pageSize: "",
      currPage: 0,
      largestPage: 0,
      pageTokens: [null]
    }
  }
  changedParamsState(){
    return ((this.props.referenceName != this.state.referenceName)
      || (this.props.start != this.state.start)
      || (this.props.end != this.state.end)
      || (this.props.pageSize != this.state.pageSize));
  }
  changedPageState(){
    return (this.props.currPage != this.state.currPage);
  }
  loadFromServer(pageToken=this.state.pageTokens[this.props.currPage]) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/variants/search", 
        type: "POST", data: JSON.stringify({
          start: this.props.start,
          end: this.props.end,
          referenceName: this.props.referenceName,
          variantSetId: this.props.variantSetId,
          pageSize: this.props.pageSize,
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
    if (!this.changedPageState() && this.changedParamsState()){
      this.state.pageTokens = [null];
      this.state.largestPage = 0;
      this.state.currPage = 0;
      console.log("reset");
    }
    this.loadFromServer();
    this.state.referenceName = this.props.referenceName;
    this.state.start = this.props.start;
    this.state.end = this.props.end;
    this.state.pageSize = this.props.pageSize;
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