import React, { Component } from 'react'
import ReferenceSet from './ReferenceSet.js'
import { ListReferences } from './ReferenceSet.js'
import VariantSet from './VariantSet.js'
import { ListCallSets, ListMetadata, ListVariantAnnotationSets, ListVariants, Metadata }
        from './VariantSet.js'
import ID from './ID.js'
import Toggle from './Toggle.js'

export default class Container extends Component{
  constructor() {
    super()
    this.state = {
      data: "",
      refName: "",
      start: "",
      end: ""
      
    }
  }
  searchVariants(){
    var refName = document.getElementById("refName").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    this.setState({refName: refName});
    this.setState({start: start});
    this.setState({end: end});
      
    console.log("ref name", this.state.refName);
  }
  loadFromServer() {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.route.baseurl + this.props.route.container + this.props.routeParams.id,
        type: "GET", data: JSON.stringify({}),
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          //console.log("loaded");
          //console.log(JSON.stringify(result));
          this.setState({data: result});
        },
        error: (xhr, status, err) => {
          console.log(err);
        }
    });
  }
  render() {
    //console.log("data", this.state.data);
    if (this.props.route.container == "referencesets/"){
      this.loadFromServer();
      let data = this.state.data;
      return <div>
        <h2>referencesets/</h2>
        <div><ID id={data.id} /> <span className="label label-primary">id</span></div>
        <div>{data.name} <span className="label label-primary">name</span></div>
        <div>{data.description} <span className="label label-primary">description</span></div>
        <div>{data.md5checksum} <span className="label label-primary">md5checksum</span></div>
        <div>{data.ncbiTaxonId} <span className="label label-primary">ncbiTaxonId</span></div>
        <div>{data.sourceUri} <span className="label label-primary">sourceUri</span></div>
        <ListReferences baseurl={this.props.route.baseurl} referenceSetId={this.props.params.id} />
        </div>
    }
    else if (this.props.route.container == "variantsets/"){
      this.loadFromServer();
      let data = this.state.data;
      //console.log("data", data);
        return (
        <div>
          <h2>variantsets/</h2>
          <div>{data.name} <span className="label label-primary">name</span> </div>
          <div><ID id={data.id} /> <span className="label label-primary">id</span></div>
          <div><ID id={data.referenceSetId} /> <span className="label label-primary">refId</span></div>
          <ListMetadata variantSetId={this.props.params.id} baseurl={this.props.route.baseurl} />
          <div className="search">
            <span className="searchBar">reference name: <input id="refName" size="5" defaultValue="1" type="text"/></span>
            <span className="searchBar">start: <input id="start" size="12" defaultValue="0" type="text"/></span>
            <span className="searchBar">end: <input size="12" id="end" defaultValue="4294967295" type="text"/></span>
            <input onClick={()=>this.searchVariants()} type="submit" value="Search"/>
          
          <ListVariants baseurl={this.props.route.baseurl} variantSetId={this.props.params.id} referenceName={this.state.refName} start={this.state.start} end={this.state.end}/>
          </div>
          <ListVariantAnnotationSets variantSetId={this.props.params.id} baseurl={this.props.route.baseurl} />
          </div>
        )
    }
    else if (this.props.route.container == "featuresets/"){
        return <span>featuresets</span>
    }
    
    else if (this.props.route.container == "datasets/"){
      return <span>datasets</span>
    }
      
    return <div>failed</div>
  }
}