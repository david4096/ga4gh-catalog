import React, { Component } from 'react';
import $ from 'jquery'

export default class ReadGroupSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
    return (
        <table>
            <tr>
                <td id="groupSetHeader" colSpan="2">
                Read group set: {this.props.name} ({this.props.id})
                </td>
            </tr>
            <tr>
                <th>Name</th>
                <th>ID</th>
            </tr>
            <tbody>
                <ListReadGroups readGroups={this.props.readGroups} baseurl={this.props.baseurl} />
            </tbody>
        </table>
    )
  }
}

class ListReadGroups extends Component {
  render() {
    let readgroups = this.props.readGroups;
    return (
      <tr>
      {readgroups.map((readgroup) => {
        return <ReadGroup baseurl={this.props.baseurl} {... readgroup} />
      })}
      </tr>
    )
  }
}

class ReadGroup extends Component {
  render() {
    return (
        
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.id}</td>
      </tr>
    )
  }
}