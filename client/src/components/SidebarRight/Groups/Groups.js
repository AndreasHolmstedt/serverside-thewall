import React, { Component } from "react";
import "./Groups.css";

class Groups extends Component {
    joinGroup(groupId, userId) {
        fetch("http://localhost:4000/api/group/" + groupId + "/join/" + userId, { method: "PUT" })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            this.props.refreshGroups()
        })
    }

    leaveGroup(groupId, userId) {
        fetch("http://localhost:4000/api/group/" + groupId + "/leave/" + userId, { method: "PUT" })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            this.props.refreshGroups()
        })
    }

    isMember(group) {
        let isMember = false;

        for(let i = 0; i < group.members.length; i ++) {
            if(group.members[i] === this.props.user._id) {
                isMember = true;
            }
        }

        return isMember;
    }
    
    render() {
        return (
            <div className="onlineGroups">
                <div className="title">
                    <h3>All Groups</h3>
                </div>
                <ul>
                    { this.props.groups.map( group => {
                        return (
                            <li key={group._id}>
                                <div className="left">
                                    <p>{ group.name }</p>
                                    { this.isMember(group)
                                        ?   <button onClick={() => this.leaveGroup(group._id, this.props.user._id)}>
                                                <p>Leave</p>
                                            </button> 
                                        :   <button onClick={() => this.joinGroup(group._id, this.props.user._id)}>
                                                <p>Join</p>
                                            </button> 
                                    }
                                </div>
                                <div className="right">
                                    <p>{ group.description }</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Groups;