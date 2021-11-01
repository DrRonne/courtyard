import React, { Component, Fragment } from 'react'
import Game from './Game.js';
import LoginForm from './Login/LoginForm.js';
import LogoutForm from './Login/LogoutForm.js';
import { ReactSession } from 'react-client-session';
import { server_ip, server_port } from './Constants.js';

export default class App extends Component {
  constructor(props) {
    super(props);
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

  render() {
    let game;
    let loginlogout;
    if (this.state.loggedIn) {
      game = <Game />
      loginlogout = <LogoutForm LogoutClicked={() => this.LogoutClicked()}/>
    }
    else {
      loginlogout = <LoginForm LoginClicked={(email, password) => this.LoginClicked(email, password)} />
    }
    return (
      <Fragment>
        {game}
        {loginlogout}
      </Fragment>
    )
  }
}
