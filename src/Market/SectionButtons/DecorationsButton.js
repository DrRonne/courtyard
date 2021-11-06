import React, { Component } from 'react'
import left from '../../assets/market/section_title_bg_left.png'
import middle from '../../assets/market/section_title_bg_middle.png'
import right from '../../assets/market/section_title_bg_right.png'

export default class DecorationsButton extends Component {
    render() {
        const middle_size = 115;
        const div_styles = {
            position: 'relative',
            margin: 5,
        };
        const left_styles = {
            position: 'absolute',
            zIndex: 1,
        };
        const middle_styles = {
            position: 'absolute',
            left: 10,
            width: middle_size,
            height: 50,
            zIndex: 1,
        };
        const right_styles = {
            position: 'absolute',
            left: 10 + middle_size,
            zIndex: 1,
        }
        const fill_styles = {
            width: 20 + middle_size,
            height: 50,
            zIndex: 1,
        }
        const text_styles = {
            position: 'absolute',
            fontSize: 25,
            color: '#513d1a',
            textAlign: 'center',
            zIndex: 2,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        }
        return (
            <div style={div_styles} >
                <img src={left} style={left_styles} alt="" />
                <img src={middle} style={middle_styles} alt="" onClick={() => this.props.onDecorationsButtonClick()} />
                <img src={right} style={right_styles} alt="" />
                <div style={fill_styles} />
                <div style={text_styles}><strong>Decorations</strong></div>
            </div>
        )
    }
}
