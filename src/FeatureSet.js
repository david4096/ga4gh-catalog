import React, { Component } from 'react';
import $ from 'jquery'
import Dataset from './Dataset.js'
import ReferenceSet from './ReferenceSet.js'

// load initial list of datasets

//datasets/search 
//pageToken: null,

//paths = {}
//paths.searchDatasets = "datasets/search"

export default class FeatureSet extends Component {
    render() {
        return (
                <div>
                <h3>Feature set</h3>
                <div>id: {this.props.id}</div>
                <div>name: {this.props.name}</div>
                <div>referenceSetId: {this.props.referenceSetId}</div>
                </div>
        )
    }
}


