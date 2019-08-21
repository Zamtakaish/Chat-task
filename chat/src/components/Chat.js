import React from 'react';
import IdleTimer from 'react-idle-timer'

import Message from "./Message";

class Chat extends React.Component{

    constructor (props){
        super(props);
        this.onAction = this._onAction.bind(this);
        this.onActive = this._onActive.bind(this);
        this.state = { messages: [], count: 0};
    }

    _onAction(e) {
        this.setState({count: 0});
    }

    _onActive(e) {
        if(this.props.socket.readyState === 3){
            console.log('Connection lost. Reestablish websocket protocol.');
        }
        this.setState({count: 0});
    }

    componentDidMount(){
        let current = this;
        this.props.socket.onmessage = function(event) {
            const responseMessageArray = JSON.parse(event.data).reverse();
            const stateMessageArray = current.state.messages;
            responseMessageArray.forEach( item => {
               stateMessageArray.push(item);
            });
            current.setState({ messages: stateMessageArray, count: +current.state.count + JSON.parse(event.data).length});
            console.log(current.state);
        };
        this.props.socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
        };
        this.props.socket.onclose = function(e) {
            console.log("[closed]");
        };
    }
    componentDidUpdate(){
        const title = document.title;
        document.title = (this.state.count !== 0) ? `(${this.state.count}) ${title.slice(-4)}` : title.slice(-4);

    }

    render() {
        let messages = [];
        for (let i = 10; i > 0; i--){
            messages.push(<Message messages={this.state}/>);
        }
        return (
            <div className="main__chat_wrapper" >
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    onActive={this.onActive}
                    onIdle={this.onIdle}
                    onAction={this.onAction}
                    debounce={250}
                    timeout={10000} />
                <div className="main__chat">
                    {
                        this.state.messages.map((item, index) =>
                            <Message from={item.from} message={item.message} time={item.time} key={`message${index}`}/>
                        )
                    }
                </div>
            </div>
        );
    }

}

export default Chat;
