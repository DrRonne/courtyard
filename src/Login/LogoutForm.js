import React, { Component } from 'react'

export default class LogoutForm extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.LogoutClicked();
    }

    render() {
        return (
            <button onClick={this.onClick}>Logout</button>
        )
    }
}
