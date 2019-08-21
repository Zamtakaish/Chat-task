import React from 'react';

export default class Input extends React.Component{

    constructor (props){
        super(props);
        this.state = { value: ''};
    }

    submitHandler = () => {
        if (this.state.value !== ''){
            this.props.socket.send(JSON.stringify({
                from: localStorage.getItem('username'),
                message: this.state.value,
            }));
            this.setState({value: ''});
        }
    };

    changeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    keyHandler = (event) => {
      if (event.key === 'Enter' && !event.shiftKey){
          event.preventDefault();
          this.submitHandler();
          this.setState({value: ''});
      }
    };

    render() {
        return (
            <div className="main__input">
                <textarea className="main__input__text" value={this.state.value} placeholder='Write a message...'
                          onChange={this.changeHandler} onKeyPress={this.keyHandler}></textarea>
                <button className="main__input__submit-button" onClick={this.submitHandler}>Send</button>
            </div>
        );
    }

}

