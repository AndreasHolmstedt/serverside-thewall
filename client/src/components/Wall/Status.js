import React, { Component } from 'react';

class Status extends Component {
    render() {
        return (
            <div className="statusContainer">
                <div className="userInfoCard">
                    <div className="imageHeader">
                        <img className="userImage" src="https://i.imgur.com/LBy4WcJ.jpg" alt="avatar"/>
                        <div className="userNameTime">
                            <h4>Robert Beck</h4>
                            <p>15:12</p>
                        </div>
                    </div>
                    <div className="info">
                        <button className="infoDots">...</button>
                        <div className="options hidden">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
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

export default Status;
