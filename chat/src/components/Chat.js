import React from 'react';

import Message from "./Message";

class Chat extends React.Component{

    constructor (props){
        super(props);
        this.state = { messages: []};
    }

    componentDidMount(){
        let current = this;
        this.props.socket.onmessage = function(event) {
            const responseMessageArray = JSON.parse(event.data).reverse();
            const stateMessageArray = current.state.messages;
            responseMessageArray.forEach( item => {
               stateMessageArray.push(item);
            });
            console.log(JSON.parse(event.data)[0].from, JSON.parse(event.data)[0].message);
            current.setState({ messages: stateMessageArray });
            console.log(current.state);
        };
    }

    render() {
        let messages = [];
        for (let i = 10; i > 0; i--){
            messages.push(<Message messages={this.state}/>);
        }
        return (
            <div className="main__chat_wrapper" >
                <div className="main__chat">
                    {
                        this.state.messages.map((item) =>
                            <Message from={item.from} message={item.message} time={item.time} />
                        )
                    }
                </div>
            </div>
        );
    }

}

export default Chat;
