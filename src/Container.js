import React, { Component } from 'react'
import ReferenceSet from './ReferenceSet.js'
import { ListReferences } from './ReferenceSet.js'
import VariantSet from './VariantSet.js'
import { ListMetadata, ListVariantAnnotationSets, ListVariants,SearchVariants }
  from './VariantSet.js'
import ID from './ID.js'
import Toggle from './Toggle.js'

export default class Container extends Component{
  constructor() {
    super()
    this.state = {
      data: ""
    }
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
          <div className="greenContainer">
            <ListMetadata variantSetId={this.props.params.id} baseurl={this.props.route.baseurl} />
          </div>
          <div className="redContainer">
            <SearchVariants id={this.props.routeParams.id} baseurl={this.props.route.baseurl} />
          </div>
          <div className="blueContainer">
            <ListVariantAnnotationSets variantSetId={this.props.params.id} baseurl={this.props.route.baseurl} />
          </div>
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