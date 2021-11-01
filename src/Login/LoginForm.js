import React, { Component } from 'react'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.email = "";
        this.password = "";

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    updateEmail(event) {
        this.email = event.target.value;
    }

    updatePassword(event) {
        this.password = event.target.value;
    }

    onClick() {
        this.props.LoginClicked(this.email, this.password);
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>email:</td>
                            <td><input type="text" onChange={this.updateEmail} /></td>
                        </tr>
                        <tr>
                            <td>password:</td>
                            <td><input type="password" onChange={this.updatePassword} /></td>
                        </tr>
                        <tr>
                            <td><button onClick={this.onClick}>Login</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
