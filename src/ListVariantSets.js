import React, { Component } from 'react';
import $ from 'jquery'
import VariantSet from './VariantSet.js'
import { Link } from 'react-router'

export default class ListVariantSets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      variantSets: []
    }
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.route.baseurl + "variantsets/search", 
        type: "POST",
        data: JSON.stringify({datasetId: this.props.params.datasetId, pageToken: pageToken}), 
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({variantSets: this.state.variantSets.concat(result.variantSets)});
          if (result.nextPageToken != "") {
            this.loadFromServer(result.nextPageToken)
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
    let variantsets = this.state.variantSets;
    return (
      <div className="blueContainer">
      {variantsets.map((variantset) => {
        return <VariantSet {... this.props} variantSet={variantset} key={variantset.id}/>
      })}
      </div>
    )
  }
}
