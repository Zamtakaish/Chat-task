import React from 'react';

export default class Input extends React.Component{

    constructor (props){
        super(props);
        this.state = { value: ''};
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    submitHandler() {
        this.props.socket.send(JSON.stringify({
            from: localStorage.getItem('value'),
            message: this.state.value,
        }));
    }

    changeHandler(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="main__input">
                <textarea rows="10" cols="45" name="text" value={this.state.value} onChange={this.changeHandler}></textarea>
                <button className="main__input_submit" onClick={this.submitHandler}>Send</button>
            </div>
        );
    }

}

