import React, { Component } from 'react'
import background from '../assets/topbar/dollars_background.png'
import icon from '../assets/topbar/dollars_icon.png'

export default class Dollars extends Component {
    render() {
        const div_styles = {
            position: 'relative',
            margin: 20,
        };
        const bg_styles = { 
            width: 90,
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
            transform: 'translate(30px, 7px)',
            color: 'white',

        }
        return (
            <div style={div_styles}>
                <img src={icon} style={icon_styles} alt=""/>
                <div style={text_styles}><strong>999</strong></div>
                <img src={background} style={bg_styles} alt=""/>
            </div>
        )
    }
}
