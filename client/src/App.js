import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile/Profile.js';
import Wall from './components/Wall/Wall.js';
import SidebarRight from "./components/SidebarRight/SidebarRight.js"
import Header from './components/Header.js';

const apiUsersEndpoint = 'http://localhost:4000/api/users'
const apiGroupsEndpoint = "http://localhost:4000/api/groups"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        users: [],
        groups: [],
        user: {},
        userFriends: [],
        userGroups: [],
        usersLoaded: false,
        groupsLoaded: false
    }
  }

    componentDidMount() {
        this.fetchUsers()
        this.fetchGroups()
    }

    fetchUsers = () => {
        fetch(apiUsersEndpoint)
        .then(response => response.json())
        .then(data => this.setState({
            users: data,
            user: data[Math.floor(Math.random() * data.length)],
            usersLoaded: true
        }, () => {
                this.findFriends()
            })
        )
    }

    fetchGroups = () => {
        fetch(apiGroupsEndpoint)
        .then(res => res.json())
        .then(data => {
          this.setState({ groups: data, groupsLoaded: true })
          this.setState({userGroups: []})
          for (let i in data){
            if(data[i].members.indexOf(this.state.user._id) !== -1){
              this.setState({ userGroups: [...this.state.userGroups, data[i]]})
              console.log(this.state.userGroups)
            }
          }
        })
    }

    refreshGroups = () => {
        this.fetchGroups()

    }

    findFriends(){
        var friendList = []

        for(let i = 0; i < 3; i++){
            let result = this.state.users.find( friend => friend._id === this.state.user.friends[i] );
            if (result){
                friendList.push(result)
            }
        }
        this.setState({userFriends: friendList})
    }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="mainCompContainer">
            { this.state.usersLoaded && this.state.userFriends.length > 0 ? <Profile user={this.state.user} users={this.state.users} userFriends={this.state.userFriends} userGroups={this.state.userGroups}/> : null }

            { this.state.usersLoaded ? <Wall user={this.state.user} users={this.state.users} /> : null}
            { this.state.groupsLoaded && this.state.usersLoaded
                ? <SidebarRight refreshGroups={this.refreshGroups} groups={this.state.groups} users={this.state.users} user={this.state.user} />
                : null
            }
        </div>
      </div>
    );
  }
}

export default App;
