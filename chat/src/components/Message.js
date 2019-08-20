import React, { Component } from 'react';

export default class Message extends Component{

    componentDidMount() {
        this.el.scrollIntoView(false);
    }

    render() {
        let messageDate = new Date();
        messageDate.setTime(this.props.time);
        const options = { hour: '2-digit', minute: '2-digit'};
        messageDate = messageDate.toLocaleDateString('de-DE', options);
        return (
            <div className="main__chat__message" ref={el => { this.el = el; }}>
                <div className="main__chat__message__username">{(this.props.from.length < 20) ? this.props.from : `${this.props.from.slice(0, 20)}...`}</div>
                <div className="main__chat__message__text">{this.props.message}</div>
                <div className="main__chat__message__time">{messageDate.slice(-5)}</div>
            </div>
        );
    }

}
