import React, { Component } from 'react'
import background from '../assets/topbar/experience_background.png'

export default class Experience extends Component {
    render() {
        const styles = { 
            width: 180,
            height: 30,
            margin: 20,
        };
        return (
            <img src={background} style={styles} alt=""/>
        )
    }
}
