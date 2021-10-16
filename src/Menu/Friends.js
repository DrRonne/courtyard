import React, { Component } from 'react'
import background from '../assets/menu/friends_background.png'

export default class Friends extends Component {
    render() {
        const div_styles = {
            position: 'absolute',
            bottom: 0,
        }
        const styles = { 
            width: 450,
            height: 100,
        };
        return (
            <React.Fragment>
                <div style={div_styles}>
                    <img src={background} style={styles} alt=""/>
                </div>
                <div style={styles}></div>
            </React.Fragment>
        )
    }
}
