import React, { Component } from 'react';
import ID from './ID.js'
import Toggle from './Toggle.js'

export default class ReadGroupSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
      //console.log("read group set", this.props);
    return (
            <div>
        <table>
            <tr>
                <td id="groupSetHeader" colSpan="6">
                Read group set: {this.props.name} (<ID id={this.props.id} />)
                </td>
            </tr>
            <tr>
                <th>Name</th>
                <th>ID</th>
                <th>created</th>
                <th>description</th>
                <th>predicted insert</th>
                <th>sampleId</th>
                <th>updated</th>
                <th>read counts</th>
            </tr>
            <tbody>
                <ListReadGroups readGroups={this.props.readGroups} baseurl={this.props.baseurl} />
            </tbody>
        </table>
            </div>
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
    //console.log("read group", this.props);
    return (
      <tr>
        <td>{this.props.name}</td>
        <td><ID id={this.props.id} /></td>
        <td>{this.props.created}</td>
        <td>{this.props.description}</td>
        <td>{this.props.predictedInsertSize}</td>
        <td>{this.props.sampleId}</td>
        <td>{this.props.updated}</td>
        <td><ReadGroupStats {... this.props.stats} /></td>
            
      </tr>
    )
  }
}

class ReadGroupStats extends Component {
  render() {
    return (
        <table id="statsTable">
            <tr><td><small>aligned</small> </td><td>{this.props.alignedReadCount}</td></tr>
            <tr><td><small>un-aligned</small></td><td>{this.props.unalignedReadCount}</td></tr>
            <tr><td><small>base count</small></td><td>{this.props.baseCount}</td></tr>
        </table>
        
    )
  }
}
