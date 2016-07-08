import React, { Component } from 'react';
import $ from 'jquery'
import Variant from './Variant.js'
import VariantAnnotationSet from './VariantAnnotationSet.js'


export default class VariantSet extends Component {
  render() {
      console.log("metadata: ", this.props);
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h3>Variant set</h3>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
        <div>refId: {this.props.referenceSetId}</div>
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
          console.log(result);
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
                <th>type</th>
            </tr>
            {this.props.metadata.map((meta) => {
             
             return <Metadata baseurl={this.props.baseurl} {... meta} />
                
        })}</table>
        </div>
    }
    
}

class Metadata extends Component {
    
    render() {
        console.log("my metadata", this.props);
         return <tr>
                <td>{this.props.description}</td>
                <td>{this.props.id}</td>
                <td>{this.props.number}</td>
                <td>{this.props.key}</td>
                <td>{this.props.type}</td>
                </tr>
    }
    
}