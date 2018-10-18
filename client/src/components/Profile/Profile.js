import React, { Component } from 'react';
import arrowUp from './icons8-chevron-up-26.png';
import arrowDown from './icons8-chevron-down-26.png';
import './Profile.css';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
        user: this.props.user,
        userFriends: this.props.userFriends,
        userGroups: this.props.userGroups,
        showFriends: true,
        showGroups: true,
    }
  }

  toggleFriendsDiv() {
    this.setState({ showFriends: !this.state.showFriends })
  }

  toggleGroupsDiv() {
    this.setState({ showGroups: !this.state.showGroups })
  }

  render() {
      const isUserFriends = this.props.userFriends
      let friendList;

      if(!isUserFriends){
          friendList = <div>loading friends..</div>
      } else {
          friendList =
          this.props.userFriends.map(data =>
              <div className="sugFriendStl"  key={data._id}>
                  <div className="sugProfileDiv" style={{backgroundImage: `url(${data.url})`}} >
                      {/*<img className="sugProfileImg" src={data.url} alt="Profile" />*/}
                  </div>
                  <p>{data.first_name}</p>
                  <p>{data.last_name}</p>
              </div>
          )

      const isUserGroups = this.props.userGroups
      let groupList;

      if(!isUserGroups){
          groupList = <div>loading groups..</div>
      } else {
          groupList =
          this.props.userGroups.map(data =>
              <div className="sugGroupStl"  key={data._id}>
                  <h6>{data.name}</h6>
                  <p>{data.description}</p>
              </div>
          )
      }

    return (
      <div className="mainProfileContainer">
        <div>
          <div className="profileDiv" key={this.props.user._id}>
            <div className="profileImg" style={{backgroundImage: `url(${this.props.user.url})`}}></div>
            <p className="profileNameStl">{this.props.user.first_name}</p>
            <p className="profileEmailStl">{this.props.user.email}</p>
          </div>
        </div>
        <div className="editProfileButtonDiv">
        </div>
        <div>
          <div className="sugFriendContainer">
            <div className="SugParagrafText">
              <p>Online Friends</p>
              <img onClick={() => this.toggleFriendsDiv()} src={this.state.showFriends ? arrowDown : arrowUp} alt="arrow"/>
            </div>
            <div className="sugInnerFriendContainer">
              {this.state.showFriends ? <div>{friendList}</div> :false}
            </div>
          </div>

          <div className="sugGroupContainer">
            <div className="SugParagrafText">
              <p>Your Groups</p>
              <img onClick={() => this.toggleGroupsDiv()} src={this.state.showGroups ? arrowDown : arrowUp} alt="arrow"/>
            </div>
            <div className="sugInnerFriendContainer">
              {this.state.showGroups ? <div>{groupList}</div> :false}
            </div>
          </div>

        </div>
      </div>
    );
  }
}
}

export default Profile;
