import React from 'react';

import Message from "./Message";

class Chat extends React.Component{

    constructor (props){
        super(props);
        this.state = { messages: []};
    }

    componentDidMount(){
        let socket = new WebSocket('ws://st-chat.shas.tel');
        let current = this;
        socket.onmessage = function(event) {
            console.log(JSON.parse(event.data)[0].from, JSON.parse(event.data)[0].message);
            let currStateArr = current.state.messages;
            currStateArr.push(JSON.parse(event.data)[0]);
            current.setState({ messages: currStateArr });
            console.log(current.state);
        };
    }

    render() {
        let messages = [];
        for (let i = 10; i > 0; i--){
            messages.push(<Message messages={this.state}/>);
        }
        return (
            <div className="main__chat_wrapper">
                <div className="main__chat">
                    {messages}
                </div>
            </div>
        );
    }

}

export default Chat;
