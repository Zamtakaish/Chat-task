import React from 'react';
import './App.css';
import Chat from "./components/Chat";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <Chat socket={new WebSocket('ws://st-chat.shas.tel')}/>
            </header>
        </div>
    );
}

export default App;
