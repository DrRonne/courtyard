import React, { Component } from 'react'

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.username = "";
        this.email = "";
        this.email2 = "";
        this.password = "";
        this.password2 = "";

        this.validUsername = new RegExp('^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');
        this.validEmail = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
         );

        this.updateUsername = this.updateUsername.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateEmail2 = this.updateEmail2.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePassword2 = this.updatePassword2.bind(this);
        this.onClick = this.onClick.bind(this);

        this.state = {
            error: "",
            success: "",
        }
    }

    updateUsername(event) {
        this.username = event.target.value;
    }

    updateEmail(event) {
        this.email = event.target.value;
    }

    updateEmail2(event) {
        this.email2 = event.target.value;
    }

    updatePassword(event) {
        this.password = event.target.value;
    }

    updatePassword2(event) {
        this.password2 = event.target.value;
    }

    setRegisterSuccesful() {
        this.setState({error: "", success: "Registration succesful! You can login now."})
    }

    onClick() {
        if (!this.validUsername.test(this.username)) {
            this.setState({error: "Username is invalid!", succes: ""});
        }
        else if (!this.validEmail.test(this.email)) {
            this.setState({error: "Email address is invalid!", succes: ""});
        }
        else if (this.email !== this.email2) {
            this.setState({error: "Email addresses are not the same!", succes: ""});
        }
        else if (this.password !== this.password2) {
            this.setState({error: "Passwords are not the same!", succes: ""});
        }
        else{
            this.props.RegisterClicked(this.username, this.email, this.email2, this.password, this.password2);
        }
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
        const error_styles = {
            color: 'red',
        }
        const success_styles = {
            color: 'green',
        }
        return (
            <div style={div_styles}>
                <table style={table_style}>
                    <tbody>
                        <tr>
                            <td><span style={text_styles}><strong>username:</strong></span><br /><input type="text" style={box_styles} onChange={this.updateUsername} /></td>
                        </tr>
                        <tr>
                            <td><span style={text_styles}><strong>email:</strong></span><br /><input type="text" style={box_styles} onChange={this.updateEmail} /></td>
                        </tr>
                        <tr>
                            <td><span style={text_styles}><strong>repeat email:</strong></span><br /><input type="text" style={box_styles} onChange={this.updateEmail2} /></td>
                        </tr>
                        <tr>
                            <td><span style={text_styles}><strong>password:</strong></span><br /><input type="password" style={box_styles} onChange={this.updatePassword} /></td>
                        </tr>
                        <tr>
                            <td><span style={text_styles}><strong>repeat password:</strong></span><br /><input type="password" style={box_styles} onChange={this.updatePassword2} /></td>
                        </tr>
                        <tr>
                            <td><button style={button_styles} onClick={this.onClick}>Register</button></td>
                        </tr>
                        <tr>
                            <span style={error_styles}>{this.state.error}</span>
                            <span style={success_styles}>{this.state.success}</span>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
