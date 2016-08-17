import React, { Component } from 'react';
import Variant from './Variant.js'
import ID from './ID.js'

export default class VariantAnnotationSet extends Component {
  render() {
    return (
      <div>
        <h3>Variant Annotation Set</h3>
        <div>{this.props.name} <span className="label label-primary">name</span></div>
        <div><ID id={this.props.id} /> <span className="label label-primary">id</span></div>
        <div>{this.props.analysis.created} <span className="label label-primary">created</span></div>
        <ListAnalysis info={this.props.analysis.info}/>
      </div>
    )
  }
}

class ListAnalysis extends Component {
  render() {
    var info = [];
    
    for (var i in this.props.info){
      info.push(i + " - " + this.props.info[i]);
    }
    return (
      <div>
        <h4>Analysis Info</h4>
        <table>
        {info.map((i) => {
          return <Analysis info={i} />
        })}
        </table>
      </div>
    )
  }
}

class Analysis extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.info}
          </td>
        </tr>
    )
  }
}
