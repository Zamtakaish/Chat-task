import React from 'react';
import IdleTimer from 'react-idle-timer'

import Chat from "./Chat";
import Input from "./Input";
import User from "./User";

export default class Messenger extends React.Component{

    constructor (props){
        super(props);
        this.socket = new WebSocket('ws://st-chat.shas.tel');
        this.onActive = this._onActive.bind(this);
    }

    _onActive(e) {
        if(this.socket.readyState === 3){
            console.log('Connection lost. Reestablish websocket protocol.');
            this.socket = new WebSocket('ws://st-chat.shas.tel');
            this.render();
        }
    }

    render() {
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

}
