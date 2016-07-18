import React, { Component } from 'react';
import $ from 'jquery'

export default class ID extends Component {

  copyToClipboard(elementId){
    
      var aux = document.createElement("input");
      aux.setAttribute("value", elementId);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    }
    
  render() {
    return (
      <span onClick={()=>this.copyToClipboard(this.props.id)}>
            {this.props.id}
      </span>
    )
  }
}