import React, { Component } from 'react';
import $ from 'jquery'

export default class ReadGroupSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
      <div>
        <h2>Read group set</h2>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
        <div><ListReadGroups readGroups={this.props.readGroups} baseurl={this.props.baseurl} /></div>
      </div>
    )
  }
}

class ListReadGroups extends Component {
  render() {
    let readgroups = this.props.readGroups;
    return (
      <div>
      {readgroups.map((readgroup) => {
        return <ReadGroup baseurl={this.props.baseurl} {... readgroup} />
      })}
      </div>
    )
  }
}

class ReadGroup extends Component {
  render() {
    return (
      <div>
        <h3>Read Group</h3>
        <div>name: {this.props.name}</div>
        <div>id: {this.props.id}</div>
      </div>
    )
  }
}