import React from 'react';
import IdleTimer from 'react-idle-timer'

import Chat from "./Chat";
import Input from "./Input";
import User from "./User";
import ConnectionError from "./ConnectionError";

export default class Messenger extends React.Component{

    constructor (props){
        super(props);
        this.state = {connected: true, server: 'ws://st-chat.shas.tel'};
        this.socket = new WebSocket(this.state.server);
        this.onActive = this._onActive.bind(this);
    }

    _onActive(e) {
        if(this.socket.readyState === 3){
            console.log('Connection lost. Reestablish websocket protocol.');
            this.socket = new WebSocket(this.state.server);
            this.render();
        }
    }

    componentDidMount() {
        let current = this;
        this.socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
            current.setState({connected: false});
        };
        this.socket.onopen = function(event) {
            console.log(`[connected]`);
            if (!current.state.connected){
                current.setState({connected: true});
            }
        };
    }

    retry = (value) =>{
        this.socket = new WebSocket(value);
        let current = this;
        this.socket.onopen = function(event) {
            console.log(`[connected]`);
            if (!current.state.connected){
                current.setState({connected: true});
            }
        };
    }

    render() {

        if(this.state.connected){
            return (
                <div className="main" >
                    <IdleTimer
                        ref={ref => { this.idleTimer = ref }}
                        element={document}
                        onActive={this.onActive}
                        debounce={250}
                        timeout={10000} />
                    <User/>
                    <Chat socket={this.socket} />
                    <Input socket={this.socket} />
                </div>
            );
        }
        else {
            return (
                <div className="main" >
                    <ConnectionError server={this.state.server} retry={this.retry}/>
                </div>
            );
        }

    }

}
