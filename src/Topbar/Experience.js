import React, { Component } from 'react'
import background from '../assets/topbar/experience_background.png'
import icon from '../assets/topbar/level_icon.png'

export default class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: this.props.level,
            exp: this.props.exp,
            exp_required: this.props.exp_required
        }
    }

    render() {
        const progress = this.state.exp / this.state.exp_required * 100;
        const div_styles = {
            position: 'relative',
            margin: 20,
        };
        const bg_styles = { 
            width: 180,
            height: 30,
            zIndex: 1
        };
        const icon_styles = {
            position: 'absolute',
            width: 65,
            height: 65,
            right: 0,
            transform: 'translate(27px, -16px)',
            zIndex: 3,
        }
        const exp_text_styles = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            transform: 'translate(0px, -2px)',
            marginLeft: 'auto',
            WebkitTextStroke: '#414512',
            WebkitTextFillColor: 'white',
            WebkitTextStrokeWidth: '1px',
            fontSize: 30,
            zIndex: 3,
        }
        const level_text_styles = {
            position: 'absolute',
            textAlign: 'center',
            right: 0,
            transform: 'translate(2px, -1px)',
            marginLeft: 'auto',
            color: '#414512',
            fontSize: 30,
            zIndex: 4,
        }
        const exp_bar_styles = {
            position: 'absolute',
            height: 'calc(100% - 10px)',
            width: `calc(${progress}% - 6px)`,
            backgroundColor: 'white',
            transform: 'translate(3px, 3px)',
            zIndex: 2,
        }
        return (
            <div style={div_styles}>
                <div style={exp_bar_styles}></div>
                <img src={icon} style={icon_styles} alt=""/>
                <div style={exp_text_styles}><strong>{this.state.exp}</strong></div>
                <div style={level_text_styles}><strong>{this.state.level}</strong></div>
                <img src={background} style={bg_styles} alt=""/>
            </div>
        )
    }
}
