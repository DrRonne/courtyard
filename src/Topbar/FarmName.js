import React, { Component } from 'react'
import background from '../assets/topbar/farm_name_background.png'

export default class FarmName extends Component {
    render() {
        const styles = { 
            width: 210,
            height: 30,
            margin: 20,
        };
        return (
            <img src={background} style={styles} alt=""/>
        )
    }
}
