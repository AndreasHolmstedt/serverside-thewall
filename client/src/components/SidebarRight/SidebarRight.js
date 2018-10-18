import React, { Component } from "react";
import "./SidebarRight.css";
import Users from "./Users/Users";
import Groups from "./Groups/Groups";

class SidebarRight extends Component {
    render() {
        return (
            <div className="SidebarRight">
                <Users users={this.props.users} />
                <Groups refreshGroups={this.props.refreshGroups} groups={this.props.groups} user={this.props.user} />
            </div>
        )
    }
}

export default SidebarRight;