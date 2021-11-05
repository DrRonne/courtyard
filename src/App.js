import React, { Component, Fragment, createRef } from 'react'
import Game from './Game.js';
import LoginForm from './Login/LoginForm.js';
import LogoutForm from './Login/LogoutForm.js';
import RegisterForm from './Login/RegisterForm.js';
import { ReactSession } from 'react-client-session';
import { server_ip, server_port } from './Constants.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.registerform = createRef();
    this.state = {
      loggedIn: false,
    }
  }

  LoginClicked(email, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };
    fetch(`http://${server_ip}:${server_port}/LoginAccount`, requestOptions)
      .then(response => response.json())
      .then(data => 
        {
          ReactSession.setStoreType("sessionStorage");
          ReactSession.set("token", data);
          this.setState({loggedIn: true});
        });
  }

  LogoutClicked() {
    ReactSession.setStoreType("sessionStorage");
    const token = ReactSession.get("token");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token })
    };
    fetch(`http://${server_ip}:${server_port}/LogoutAccount`, requestOptions);
    ReactSession.setStoreType("sessionStorage");
    ReactSession.set("token", null);
    this.setState({loggedIn: false});
  }

  RegisterClicked(username, email, email2, password, password2) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, email: email, email2: email2, password: password, password2: password2 })
    };
    fetch(`http://${server_ip}:${server_port}/RegisterAccount`, requestOptions)
      .then(response => {
        if (response.ok) {
          this.registerform.current.setRegisterSuccesful();
        }
      });
  }

  render() {
    let game;
    let loginlogout;
    if (this.state.loggedIn) {
      game = <Game />
      loginlogout = <LogoutForm LogoutClicked={() => this.LogoutClicked()}/>
    }
    else {
      const parent_div_styles = {
        textAlign: 'center',
      }
      const div_styles = {
        backgroundColor: '#6f5437',
        borderRadius: 10,
        border: '3px solid #8b7351',
        display: 'inline-block',
      }
      const question_styles = {
        fontFamily: "Comic Sans MS",
        color: "white",
        fontSize: 20,
      }
      loginlogout = <div style={parent_div_styles}><div style={div_styles}>
          <LoginForm LoginClicked={(email, password) => this.LoginClicked(email, password)} />
          <span style={question_styles}><strong>Don't have an account yet?<br />Create a new account!</strong></span>
          <RegisterForm ref={this.registerform} RegisterClicked={(username, email, email2, password, password2) => this.RegisterClicked(username, email, email2, password, password2)} />
        </div></div>
    }
    const title_styles = {
      fontFamily: "Comic Sans MS",
      backgroundImage: 'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
      webkitBackgroundClip: 'text',
      color: 'transparent',
      fontSize: 50,
    }
    const div_title_styles = {
      textAlign: 'center',
    }
    return (
      <Fragment>
        <div style={div_title_styles}><span style={title_styles}><strong>Welcome to my uber fantastic farmgame!<br />To start playing, login or create an account and then login :)</strong></span></div>
        {game}
        {loginlogout}
      </Fragment>
    )
  }
}
