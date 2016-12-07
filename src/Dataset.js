import React, { Component } from 'react';
import $ from 'jquery'
import VariantSet from './VariantSet.js'
import ReadGroupSet from './ReadGroupSet.js'
import FeatureSet from './FeatureSet.js'
import ID from './ID.js'
import { Link } from 'react-router'
import Feature from './Feature.js'

export default class Dataset extends Component {
  constructor(props) {
    super(props)
    if (this.props.params.datasetId) {
      this.state = {
        dataset: {id: this.props.params.datasetId}
      }
    } else {
      this.state = {
        dataset: this.props.dataset
      }
    }
  }
  componentDidMount() {
    this.loadFromServer();
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  loadFromServer(pageToken=null) {
    let type = {'content-type': 'application/json'};
    this.serverRequest = $.ajax(
      { url: this.props.route.baseurl + "datasets/" + this.state.dataset.id, 
        type: "GET",
        dataType: "json", 
        contentType: "application/json", 
        success: (result) => {
          this.setState({dataset: result});
        },
        error: (xhr, status, err) => {
          console.log(err);
        }
    });
  }
  render() {
    return (
      <div>
        <Link to={'/datasets/' + this.state.dataset.id}>Dataset: {this.state.dataset.name}</Link>
        <ID id={this.state.dataset.id} />
        <div>{this.state.dataset.description}</div>
        <div><Link to={'/datasets/' + this.state.dataset.id + '/readgroupsets'}>Read Group sets</Link></div>
        <div><Link to={'/datasets/' + this.state.dataset.id + '/variantsets'}>Variant sets</Link></div>
        <div><Link to={'/datasets/' + this.state.dataset.id + '/featuresets'}>Feature sets</Link></div>
        {this.props.children}
      </div>
    )
  }
}


