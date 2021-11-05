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
        const div_styles = {
            margin: 10,
        }
        const table_style = {
            backgroundColor: '#ccb291',
            borderRadius: 10,
            border: '3px solid #8b7351',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
        }
        const text_styles = {
            fontFamily: "Comic Sans MS",
            color: "#513d1a",
            fontSize: 25,
        }
        const button_styles = {
            backgroundColor: '#80c143',
            borderRadius: 10,
            border: '3px solid #126713',
            display: 'table',
            margin: '0 auto',
            fontFamily: "Comic Sans MS",
            fontSize: 25,
            color: 'white',
        }
        const box_styles = {
            borderRadius: 10,
            border: '3px solid #787063',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            fontSize: 20,
        }
        return (
            <div style={div_styles}>
                <table style={table_style}>
                    <tbody>
                        <tr>
                            <td><span style={text_styles}><strong>email:</strong></span><br /><input type="text" style={box_styles} onChange={this.updateEmail} /></td>
                        </tr>
                        <tr>
                            <td><span style={text_styles}><strong>password:</strong></span><br /><input type="password" style={box_styles} onChange={this.updatePassword} /></td>
                        </tr>
                        <tr>
                            <td><button style={button_styles} onClick={this.onClick}>Login</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
