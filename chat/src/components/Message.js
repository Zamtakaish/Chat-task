import React, { Component } from 'react';

export default class Message extends Component{

    componentDidMount() {
        this.el.scrollIntoView(false);
    }

    render() {
        return (
            <div className="main__chat__message" ref={el => { this.el = el; }}>
                <div className="main__chat__message__username">{this.props.from}</div>
                <div className="main__chat__message__text">{this.props.message}</div>
                <div className="main__chat__message__time">{this.props.time}</div>
            </div>
        );
    }

}
