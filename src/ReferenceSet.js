import React, { Component } from 'react';
import $ from 'jquery'
import ID from './ID.js'
import Reference from './Reference.js'
import { Link } from 'react-router'
import ListReferences from './ListReferences'

export default class ReferenceSet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      referenceSet: props
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
      { url: this.props.route.baseurl + "referencesets/" + this.state.referenceSet.id, 
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
        <Link to={'/referencesets/'+this.state.referenceSet.id}>Reference set: {this.state.referenceSet.name}</Link>
        (<ID id={this.state.referenceSet.id} />)
        <div>{this.state.referenceSet.description}</div>
        <ListReferences {... this.props} />
      </div>
    )
  }
}
