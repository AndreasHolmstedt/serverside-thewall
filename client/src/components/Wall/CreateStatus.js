import React, { Component } from "react";

class CreateStatus extends Component {
    
    render() {
      return (
        <div className="createStatusContainer">
          <div className="optionCreate"><p>Status</p></div>
          <textarea className="textAreaStatus" placeholder="What's up?"/>
          <div className="postButtonContainer">
            <button className="settingsButton">Settings</button>
            <button className="postButton">Post</button>
          </div>
        </div>
      );
    }
}

export default CreateStatus;
