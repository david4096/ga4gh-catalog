import React, { Component } from 'react';
import Dataset from './Dataset.js'
import ReferenceSet, { SelectReferences } from './ReferenceSet.js'
import ID from './ID.js'
import { Link } from 'react-router'
import Feature from './Feature.js'

export default class FeatureSet extends Component {
  render() {
    return (
      <div>
        <h2><Link to={'/featuresets/'+this.props.id}>Feature set: {this.props.name} </Link> <h4>(<ID id={this.props.id} />)</h4></h2>
        <h3 style={{color:'#e520de'}}><i>{this.props.description}</i></h3>
        </div>
    )
  }
}

export class ListFeatures extends Component {
    constructor() {
      super()
      this.state = {
        features: [],
        referenceName: "",
        start: "",
        end: "",
        currPage: 0,
        largestPage: 0,
        geneSymbol: "",
        pageTokens: [null]
      }
    }
    changedParamsState(){ //checks if any parameters have been change
        return ((this.props.referenceName != this.state.referenceName)
                || (this.props.start != this.state.start)
                || (this.props.end != this.state.end)
                || (this.props.featureType != this.state.featureType)
                || (this.props.geneSymbol != this.state.geneSymbol));
    }
    changedPageState(){
        return (this.props.currPage != this.state.currPage);
    }
    loadFromServer(pageToken=this.state.pageTokens[this.props.currPage]) {
      let type = {'content-type': 'application/json'};
      this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/features/search",
        type: "POST", data: JSON.stringify({
          start: this.props.start,
          end: this.props.end,
          referenceName: this.props.referenceName,
          pageSize: "30", //30 by default
          featureSetId: this.props.id,
          geneSymbol: this.props.geneSymbol,
          pageToken: pageToken,
          featureTypes:[this.props.featureType]}),
        dataType: "json", 
        contentType: "application/json", 
         success: (result) => {
           this.setState({features: this.state.features.concat(result.features)});
           //console.log("result", result.features);
           if (this.state.largestPage == this.state.currPage && !this.state.pageTokens.includes(result.nextPageToken))
            this.setState({pageTokens: this.state.pageTokens.concat(result.nextPageToken)});
          console.log("curr pages: ", this.state.pageTokens);
        },
        error: (xhr, status, err) => {
          console.log("feature error " + err);
                                  
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
    if (this.changedParamsState() || this.changedPageState()){ //if parameters or current page are changed
        console.log("changed");
        this.setState({features: []}); //reset current features list
        this.state.currPage = this.props.currPage;
        if (this.state.currPage > this.state.largestPage){
          this.state.largestPage = this.state.currPage;
        }
        //console.log("currPage ", this.state.currPage);
        //console.log("largest page ", this.state.largestPage);
        if (this.changedParamsState()  && !this.changedPageState()){ //if only search terms changed
          this.state.pageTokens = [null]; //reset all page-related variables
          this.state.largestPage = 0;
          this.state.currPage = 0;
          console.log("reset");
        }
    this.loadFromServer();
    this.state.referenceName = this.props.referenceName;
    this.state.start = this.props.start;
    this.state.end = this.props.end;
    this.state.featureType = this.props.featureType;
    this.state.geneSymbol = this.props.geneSymbol;
    }
      return <div>
        <h4>Features</h4>
          <table>
            <tr>
              <th>name</th>
              <th>id</th>
              <th>strand</th>
              <th>start</th>
              <th>end</th>
              <th>geneSymbol</th>
            </tr>
        {this.state.features.map((feature) => {
             return <Feature {... feature} />
                
        })}</table>
        </div>
    }
}

export class SearchFeatures extends Component {
  constructor() {
    super()
    this.state = {
      data: "",
      refName: "",
      start: "",
      end: "",
      currPage: 0,
      //parentID: "",
      geneSymbol: "",
      name: "",
      featureType: ""
    }
  }
  searchFeatures(){ //re-initializes search parameters based on HTML input form
    this.setState({currPage: 0});
    var refName = document.getElementById("refName").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var featureType = document.getElementById("featureType").value;
    var geneSymbol = document.getElementById("geneSymbol").value;
    //var parentID = document.getElementById("parentID").value;
    this.setState({refName: refName});
    this.setState({start: start});
    this.setState({end: end});
    this.setState({featureType: featureType});
    this.setState({geneSymbol: geneSymbol});
    
  }
  updateCurrentPage(p){
    if (this.state.currPage + p >= 0)
      this.state.currPage = this.state.currPage + p;
    //console.log("currPage: ", this.state.currPage);
  }
  render() {
    let data = this.state.data;
    return (
      <span>
        <div>
          <span className="searchBar">reference name:</span>
          <SelectReferences id="refName" layout="features"/>
          <span className="searchBar">start: <input id="start" size="12" defaultValue="0" type="text"/></span>
          <span className="searchBar">end: <input size="12" id="end" defaultValue="4294967295" type="text"/>
            </span>
          <span className="searchBar">feature type: </span>
          <SelectFeatures id="featureType"/>
          <input onClick={()=>this.searchFeatures()} type="submit" value="Search"/>
          <button onClick={()=>this.updateCurrentPage(-1)} className="button"> &larr; </button>
          <button onClick={()=>this.updateCurrentPage(1)} className="button"> &rarr; </button>
        </div>
        <div>
        <span className="searchBar">gene symbol: <input id="geneSymbol" size="5" defaultValue=""
            type="text"/>
        </span>
        </div>
        <ListFeatures baseurl={this.props.baseurl} id={this.props.id} referenceName={this.state.refName} start={this.state.start} end={this.state.end}currPage={this.state.currPage} featureType={this.state.featureType} geneSymbol={this.state.geneSymbol} />
      </span>
    )
  }
}

export class SelectFeatures extends Component {
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
      <span>
      <select id={this.props.id}>
        <option value="CDS">CDS</option>
        <option value="stop_codon">stop_codon</option>
        <option value="gene">gene</option>
        <option value="transcript">transcript</option>
        <option value="exon">exon</option>
        <option value="start_codon">start_codon</option>
        <option value="UTR">UTR</option>
      </select>
      </span>
    )
  }
}
