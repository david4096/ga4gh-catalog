import React, { Component } from 'react';
import Dataset from './Dataset.js'
import ReferenceSet from './ReferenceSet.js'
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
        pageSize: "",
        currPage: 0,
        largestPage: 0,
        geneSymbol: "",
        pageTokens: [null]
      }
    }
    changedParamsState(){
        return ((this.props.referenceName != this.state.referenceName)
                || (this.props.start != this.state.start)
                || (this.props.end != this.state.end)
                || (this.props.pageSize != this.state.pageSize)
                || (this.props.featureType != this.state.featureType)
                || (this.props.geneSymbol != this.state.geneSymbol));
    }
    changedPageState(){
        return (this.props.currPage != this.state.currPage);
    }
    loadFromServer(pageToken=this.state.pageTokens[this.props.currPage]) {
      console.log("id", this.props.id);
      let type = {'content-type': 'application/json'};
      this.serverRequest = $.ajax(
      { url: this.props.baseurl + "/features/search",
        type: "POST", data: JSON.stringify({
          start: this.props.start,
          end: this.props.end,
          referenceName: this.props.referenceName,
          pageSize: this.props.pageSize,
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
          console.log("err", this.props);
                                  
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
      this.setState({features: []});
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
      pageSize: "",
      currPage: 0,
      parentID: "",
      geneSymbol: "",
      name: "",
      featureType: ""
    }
  }
  searchFeatures(){
    this.setState({currPage: 0});
    var refName = document.getElementById("refName").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var pageSize = document.getElementById("pageSize").value;
    //var name = document.getElementById("name").value;
    var featureType = document.getElementById("featureType").value;
    var geneSymbol = document.getElementById("geneSymbol").value;
    //var parentID = document.getElementById("parentID").value;
    this.setState({refName: refName});
    this.setState({start: start});
    this.setState({end: end});
    this.setState({pageSize: pageSize});
    this.setState({featureType: featureType});
    this.setState({geneSymbol: geneSymbol});
    console.log("start", start);
    console.log("end", end);
    console.log("refName", refName);
    console.log("pageSize", pageSize);
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
          <span className="searchBar">reference name: <input id="refName" size="5" defaultValue="chr1" type="text"/>
            </span>
          <span className="searchBar">start: <input id="start" size="12" defaultValue="0" type="text"/></span>
          <span className="searchBar">end: <input size="12" id="end" defaultValue="4294967295" type="text"/>
            </span>
          <span className="searchBar">pageSize: <input size="4" id="pageSize" defaultValue="30" type="text"/>
            </span>
          <input onClick={()=>this.searchFeatures()} type="submit" value="Search"/>
          <button onClick={()=>this.updateCurrentPage(-1)} className="button"> &larr; </button>
          <button onClick={()=>this.updateCurrentPage(1)} className="button"> &rarr; </button>
        </div>
        <div>
          
          <span className="searchBar">gene symbol: <input id="geneSymbol" size="5" defaultValue="" type="text"/></span>
          
          <span className="searchBar">feature type: <input id="featureType" size="5" defaultValue="gene" type="text"/></span>
        </div>
        <ListFeatures baseurl={this.props.baseurl} id={this.props.id} referenceName={this.state.refName} start={this.state.start} end={this.state.end} pageSize={this.state.pageSize} currPage={this.state.currPage} featureType={this.state.featureType} geneSymbol={this.state.geneSymbol} />
      </span>
    )
  }
}
