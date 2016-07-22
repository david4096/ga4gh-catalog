import React, { Component } from 'react';
import $ from 'jquery'

export default class ID extends Component {

  copyToClipboard(e, elementId){
    
      var aux = document.createElement("input");
      aux.setAttribute("value", elementId);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      
      var element = document.getElementById(e._reactInternalInstance._rootNodeID);
      
      element.style.color = "gold";
      setTimeout(function(){
        element.style.color = "black";
      }, 200);
      
    }
    
  render() {
      //console.log({this.props.id}, ": ", {this._reactInternalInstance});
    return (
      <span className="pointer" id={this._reactInternalInstance._rootNodeID} onClick={()=>this.copyToClipboard(this, this.props.id)}>
            {this.props.id}
      </span>
    )
  }
}