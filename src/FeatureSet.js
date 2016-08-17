import React, { Component } from 'react';
import Dataset from './Dataset.js'
import ReferenceSet from './ReferenceSet.js'
import ID from './ID.js'
import { Link } from 'react-router'

// load initial list of datasets

//datasets/search 
//pageToken: null,

//paths = {}
//paths.searchDatasets = "datasets/search"

export default class FeatureSet extends Component {
  render() {
    return (
      <div>
        <h2><Link to={'/featuresets/'+this.props.id}>Feature set: {this.props.name} </Link>(<ID id={this.props.id} />)</h2>
        <h3>{this.props.description}</h3>
        </div>
    )
  }
}

export class ListFeatures extends Component {
  render(){
    return <span>everyone around </span>
  }
}