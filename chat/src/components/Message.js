import React, { Component } from 'react';

export default class Message extends Component{

    componentDidMount() {
        this.el.scrollIntoView(false);
    }

    calculateColor = () => {
        let charSum = 0;
        const arr = this.props.from.split('');
        arr.forEach(item =>{
            charSum += item.charCodeAt(0);
        });
        return `hsl(${charSum % 255}, 50%, 50%)`;
    };

    render() {
        let messageDate = new Date();
        messageDate.setTime(this.props.time);
        const options = { hour: '2-digit', minute: '2-digit'};
        messageDate = messageDate.toLocaleDateString('ru-RU', options);
        return (
            <div className={localStorage.getItem('username') === this.props.from ? "main__chat__message self" : "main__chat__message"} ref={el => { this.el = el; }}>
                <div className="main__chat__message__username" style={{color: this.calculateColor()}}>
                    {(this.props.from.length < 20) ? this.props.from : `${this.props.from.slice(0, 20)}...`}
                </div>
                <div className="main__chat__message__text">{this.props.message}</div>
                <div className="main__chat__message__time">{messageDate.slice(-5)}</div>
            </div>
        );
    }

}
