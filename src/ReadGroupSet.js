import React, { Component } from 'react';
import ID from './ID.js'

export default class ReadGroupSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
      console.log("read group set", this.props);
    return (
        <table>
            <tr>
                <td id="groupSetHeader" colSpan="5">
                Read group set: {this.props.name} (<ID id={this.props.id} />)
                </td>
            </tr>
            <tr>
                <th>Name</th>
                <th>ID</th>
                <th>created</th>
                <th>description</th>
                <th>predicted insert</th>
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
      //console.log("read group", this.props)
    return (
      <tr>
        <td>{this.props.name}</td>
        <td><ID id={this.props.id} /></td>
        <td>{this.props.created}</td>
        <td>{this.props.description}</td>
        <td>{this.props.predictedInsertSize}</td>
      </tr>
    )
  }
}