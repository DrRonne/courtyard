import React, { Component } from 'react'
import background from '../assets/topbar/coins_background.png'
import icon from '../assets/topbar/coins_icon.png'

export default class Coins extends Component {
    render() {
        const div_styles = {
            position: 'relative',
            margin: 20,
        };
        const bg_styles = { 
            width: 150,
            height: 30,
        };
        const icon_styles = {
            position: 'absolute',
            width: 50,
            height: 50,
            transform: 'translate(-50%, -10px)',
        }
        const text_styles = {
            position: 'absolute',
            transform: 'translate(22px, 2px)',
            color: 'white',
            fontSize: 25,
        }
        return (
            <div style={div_styles}>
                <img src={icon} style={icon_styles} alt=""/>
                <div style={text_styles}><strong>999,999,999</strong></div>
                <img src={background} style={bg_styles} alt=""/>
            </div>
        )
    }
}
