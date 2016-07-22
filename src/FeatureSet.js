import React, { Component } from 'react';
import Dataset from './Dataset.js'
import ReferenceSet from './ReferenceSet.js'
import ID from './ID.js'

// load initial list of datasets

//datasets/search 
//pageToken: null,

//paths = {}
//paths.searchDatasets = "datasets/search"

export default class FeatureSet extends Component {
    render() {
        return (
            <div>
            <h2>Feature set</h2>
            <div>{this.props.description} <span className="label label-primary">description</span></div>
            <div><ID id={this.props.id} /> <span className="label label-primary">id</span></div>
            <div>{this.props.name} <span className="label label-primary">name</span></div>
            <div><ID id={this.props.referenceSetId} /> <span className="label label-primary">refId</span></div>
            </div>
        )
    }
}