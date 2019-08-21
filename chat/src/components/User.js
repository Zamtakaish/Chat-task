import React from 'react';

export default class User extends React.Component{

    constructor(props){
        super(props);
        this.state = {value: localStorage.getItem('value')||'Anonymous',
                      changeable: false};
        this.clickHandler = this.clickHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    clickHandler() {
        this.setState({changeable: true});
    }

    changeHandler(event) {
        this.setState({value: event.target.value});
    }

    submitHandler() {
        this.setState({changeable: false});
    }

    render() {
        if(this.state.changeable){
            return (
                <div className="main__username_wrapper">
                    <p className="main__username_title">Logged as:</p>
                    <input type="text" className="main__username_input" value={this.state.value} onChange={this.changeHandler} />
                    <button className="main__username_submit-button" onClick={this.submitHandler}>Submit</button>
                </div>
            );
        }
        else {
            return (
                <div className="main__username_wrapper">
                    <p className="main__username_title">Logged as:</p>
                    <div className="main__username" onClick={this.clickHandler}>{this.state.value}</div>
                </div>
            );
        }
    }

}

