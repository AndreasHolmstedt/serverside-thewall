import React, { Component } from 'react';
import './CSS/StatusWallComponent.css';

const API = 'http://localhost:4000/api/statuses';


class StatusWallComponent extends Component {
  constructor(props){
    super(props);

    this.state={
      apiData: []
    }
  }



  componentDidMount() {
    this.fetchStatus();
  }

  let logg = () =>{
    console.log(this.state.apiData)
  }

  fetchStatus(){
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({
        apiData: data
      })
    )
  }




  render() {
    const list = this.state.apiData.map(data =>
      <div key={data._id} className="statusContainer">
        <div className="userInfoCard">
          <img className="userImage" src="https://i.imgur.com/LBy4WcJ.jpg" />
          <div className="userNameTime">
            <h4>Robert Beck</h4>
            <p>{data.timestamp}</p>
          </div>
        </div>
        <div className="statusText">
          <p>{data.text}</p>
        </div>
      </div>
    );
    return (
        <div className="wallContainer">
          <div className="createStatusContainer">
            <div className="optionCreate"><p>Status</p></div>
            <textarea className="textAreaStatus" placeholder="What's up?"/>
            <div className="postButtonContainer">
              <button className="settingsButton">Settings</button>
              <button className="postButton" onClick={this.logg}>Postlkl</button>
            </div>
          </div>
          {list}

        </div>
    );
  }
}



class Status extends Component {
  render() {
    return (
        <div className="statusContainer">
          <div className="userInfoCard">
            <img className="userImage" src="https://i.imgur.com/LBy4WcJ.jpg" />
            <div className="userNameTime">
              <h4>Robert Beck</h4>
              <p>15:12</p>
            </div>
          </div>
          <div className="statusText">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
    );
  }
}


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

export default StatusWallComponent;
