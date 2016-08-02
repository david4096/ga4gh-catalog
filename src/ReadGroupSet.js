import React, { Component } from 'react';
import ID from './ID.js'
import { Router, Route, Link, browserHistory } from 'react-router'

export default class ReadGroupSet extends Component {
  render() {
    // <ListVariants variantSetId={this.props.id} baseurl={this.props.baseurl} />
      //console.log("read group set", this.props);
    return (
            <div>
        <table>
            <tr>
                <td id="groupSetHeader" colSpan="8">
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
  humanReadable(d){
      var date = new Date(parseInt(d));
      date = date.getMonth() + "/" + date.getDate() + "/" + (parseInt(date.getYear()) + 1900) + " " + (parseInt(date.getHours()) % 12) + ":" + ('0'  + date.getMinutes()).slice(-2) + " " + ((date.getHours() >= 12) ? "PM" : "AM");
      return date;
  }
  render() {
    var updated = this.humanReadable(this.props.updated);
    var created = this.humanReadable(this.props.created);
    return (
      <tr>
        <td><Link to={'/readgroups/'+this.props.id}>{this.props.name}</Link></td>
        <td><ID id={this.props.id} /></td>
        <td>{created}</td>
        <td>{this.props.description}</td>
        <td>{this.props.predictedInsertSize}</td>
        <td>{this.props.sampleId}</td>
        <td>{updated}</td>
        <td><ReadGroupStats {... this.props.stats} /></td>
      </tr>
    )
  }
}

class ReadGroupStats extends Component{
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