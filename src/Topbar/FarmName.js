import React, { Component } from 'react'
import background from '../assets/topbar/farm_name_background.png'

export default class FarmName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
        }
    }
    render() {
        const div_styles = {
            position: 'relative',
            margin: 20,
        };
        const bg_styles = { 
            width: 210,
            height: 30,
        };
        const text_styles = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            marginLeft: 'auto',
            WebkitTextStroke: '#414512',
            WebkitTextFillColor: 'white',
            WebkitTextStrokeWidth: '1px',
            fontSize: 22,
            zIndex: 3,
        }
        return (
            <div style={div_styles}>
                <div style={text_styles}><strong>{this.state.name}</strong></div>
                <img src={background} style={bg_styles} alt=""/>
            </div>
        )
    }
}
