import React, { Component } from "react";
import "./Users.css";

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            loaded: false
        }
    }

    componentDidMount() {
        let users = this.props.users
        // Sort array of users randomly and then get first nUsers amount of users.
        let nUsers = Math.floor(Math.random() * 10) + 5
        let randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, nUsers)

        this.setState({ users: randomUsers, loaded: true })
    }
    
    render() {
        return (
            <div className="onlineUsers">
                <div className="title">
                    <h3>Online Users</h3>
                    <p>({this.state.users.length})</p>
                </div>
                
                { this.state.loaded 
                    ?   <ul>
                            { this.state.users.map( user => {
                                return (
                                <li key={user._id}>
                                    <div className="left">
                                        <img className="avatar" src={user.url} alt="Avatar" />
                                        <p>{user.first_name + " " + user.last_name}</p>
                                    </div>
                                    <div className="right">
                                        <div className="greenCircle" />
                                    </div>
                                </li>
                                )
                            }) }
                        </ul>
                    :   <p>Loading Users...</p>
                }
            </div>
        )
    }
}

export default Users;