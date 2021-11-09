import React, { Component } from 'react'

export default class SeedsButton extends Component {
    render() {
        const div_styles = {
            position: 'relative',
            margin: 5,
        };
        const text_styles = {
            position: 'relative',
            fontSize: 25,
            color: '#513d1a',
            backgroundColor: '#d9cda7',
            border: '3px solid #b4a07d',
            borderRadius: 10,
            padding: '4px 4px 4px 4px',
            textAlign: 'center',
            zIndex: 2,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        }
        return (
            <div style={div_styles} >
                <div style={text_styles} onClick={() => this.props.onSeedsButtonClick()} ><strong>Seeds</strong></div>
            </div>
        )
    }
}
