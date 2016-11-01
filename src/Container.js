import React, { Component } from 'react'
import ReferenceSet from './ReferenceSet.js'
import { ListReferences } from './ReferenceSet.js'
import { ListFeatures, SearchFeatures } from './FeatureSet.js'
import VariantSet from './VariantSet.js'
import { ListMetadata, ListVariantAnnotationSets, ListVariants,SearchVariants }
  from './VariantSet.js'
import ID from './ID.js'
import Toggle from './Toggle.js'

//containers such as "variant and feature sets
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
          this.setState({data: result});
        },
        error: (xhr, status, err) => {
          console.log(err);
        }
    });
  }
  componentWillUnmount() {
      this.serverRequest.abort();
    }
  render() {
    if (this.props.route.container == "referencesets/"){ //decide which header/layout to use, based on type of set
      this.loadFromServer();
      let data = this.state.data;
      return <div>
        <h3>referencesets/</h3>
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
        return (
        <div>
          <h3>variantsets/</h3>
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
        this.loadFromServer();
        let data = this.state.data;
        return <div>
          <h3>featuresets/</h3>
          <div>{data.name} <span className="label label-primary">name</span> </div>
          <div><ID id={data.id} /> <span className="label label-primary">id</span></div>
          <div><ID id={data.referenceSetId} /> <span className="label label-primary">refId</span></div>
          <div className="redContainer">
            <SearchFeatures baseurl={this.props.route.baseurl} id={this.props.params.id} />
          </div>
        </div>
    }
    
    else if (this.props.route.container == "datasets/"){
      return <span>datasets</span>
    }
      
    return <div>failed</div>
  }
}
