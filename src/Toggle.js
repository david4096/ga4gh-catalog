import React, { Component } from 'react';
import $ from 'jquery'

export default class Toggle extends Component {

  toggleView(e){
    var header = $(document.getElementById(e._reactInternalInstance._rootNodeID));
    
    //getting all sibling elements
    var content = header.nextAll();
    
    //hide if visible, show if not
    content.toggle(0, function () {
       header.text(function () {
        //change text based on condition
        return content.is(":visible") ? "hide" : "show";
      });
    });
  }
    
  render() {
      //console.log({this.props.id}, ": ", {this._reactInternalInstance});
    return (
      <button style={{width: "100%"}} id={this._reactInternalInstance._rootNodeID} onClick={()=>this.toggleView(this)}>
        hide
      </button>
    )

  }
}