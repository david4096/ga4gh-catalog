import React, { Component } from 'react';
import $ from 'jquery'

export default class ID extends Component {

  copyToClipboard(elementId){
    
      // Create a "hidden" input
      var aux = document.createElement("input");

      // Assign it the value of the specified element
      aux.setAttribute("value", elementId);
      
      // Append it to the body
      document.body.appendChild(aux);
      
      // Highlight its content
      aux.select();
      
      // Copy the highlighted text
      document.execCommand("copy");
      
      // Remove it from the body
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