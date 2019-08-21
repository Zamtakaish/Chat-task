import React from 'react';

export default class ConnectionError extends React.Component{

    constructor (props){
        super(props);
        this.state = {server: this.props.server, changeable: false};
        this.clickHandler = this.clickHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    clickHandler() {
        this.setState({changeable: true});
    }

    changeHandler(event) {
        this.setState({server: event.target.value});
    }

    submitHandler() {
        this.setState({changeable: false});
    }

    retryHandler = () => {
        this.props.retry(this.state.server);
        console.log('aaa')
    }

    render() {

        if(!this.state.changeable){
            return (
                <>
                    <div>Unable to connect to server:</div>
                    <div onClick={this.clickHandler}>{this.state.server}</div>
                    <button onClick={this.retryHandler}>Retry</button>
                </>
            );
        }
        else {
            return (
                <>
                    <div>Unable to connect to server:</div>
                    <div>
                        <input type="text" className="main__error_input" value={this.state.server} onChange={this.changeHandler} />
                        <button className="main__error_submit-button" onClick={this.submitHandler}>Submit</button>
                    </div>
                    <button onClick={this.retryHandler}>Retry</button>
                </>
            );
        }

    }

}
