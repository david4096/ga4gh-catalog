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
                <div>id: <ID id={this.props.id} /></div>
                <div>name: {this.props.name}</div>
                <div>referenceSetId: <ID id={this.props.referenceSetId} /></div>
                </div>
        )
    }
}