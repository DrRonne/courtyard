import React, { Component } from 'react'
import background from '../assets/topbar/dollars_background.png'
import icon from '../assets/topbar/dollars_icon.png'

export default class Dollars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        }
    }

    setCash(amount) {
        this.setState({value: amount});
    }

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
            transform: 'translate(25px, 2px)',
            color: 'white',
            fontSize: 25,
        }
        return (
            <div style={div_styles}>
                <img src={icon} style={icon_styles} alt=""/>
                <div style={text_styles}><strong>{this.state.value}</strong></div>
                <img src={background} style={bg_styles} alt=""/>
            </div>
        )
    }
}
