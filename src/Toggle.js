import React, { Component } from 'react';
import $ from 'jquery'

export default class Toggle extends Component {

  toggleView(e, text){
    if (!text)
      text = "";
    var header = $(document.getElementById(e._reactInternalInstance._rootNodeID));
    
    //getting all sibling elements
    var content = header.nextAll();
    
    //hide if visible, show if not
    content.toggle(0, function () {
       header.text(function () {
        //change text based on condition
        return content.is(":visible") ? "hide " + text : "show " + text;
      });
    });
  }
    
  componentDidMount(){
      if (this.props.defaultView == "hide"){
          this.toggleView(this, this.props.text);
      }
  }
    
  render() {
      //console.log({this.props.id}, ": ", {this._reactInternalInstance});
    if (this.props.wrapper == "span"){
      return (
        <h3 id={this._reactInternalInstance._rootNodeID} onClick={()=>this.toggleView(this, this.props.text)}>
              hide {this.props.text}
        </h3>
      )
    }
    return (
        <button id={this._reactInternalInstance._rootNodeID} onClick={()=>this.toggleView(this, this.props.text)}>
              hide {this.props.text}
        </button>
      )
    }
}