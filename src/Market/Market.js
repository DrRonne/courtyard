import React, { Component } from 'react'
import background from '../assets/market/background.png'
import close from '../assets/market/close.png'
import title from '../assets/market/title.png'

import SeedsButton from './SectionButtons/SeedsButton'
import TreesButton from './SectionButtons/TreesButton'
import AnimalsButton from './SectionButtons/AnimalsButton'
import BuildingsButton from './SectionButtons/BuildingsButton'
import DecorationsButton from './SectionButtons/DecorationsButton'
import ExpandButton from './SectionButtons/ExpandButton'
import TractorsButton from './SectionButtons/TractorsButton'

import Seeds from './Sections/Seeds'

export default class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    setVisible(visible) {
        const statecopy = {...this.state};
        statecopy.visible = visible;
        this.setState(statecopy);
    }

    onCloseClick() {
        this.setVisible(false);
    }

    render() {
        if (this.state.visible) {
            const div_styles = {
                position: 'absolute',
                top: 65,
                left: '50%',
                transform: 'translate(-50%, 0%)',
            };
            const bg_styles = {
                zIndex: 1,
            };
            const title_styles = {
                position: 'absolute',
                top: 10,
                left: 325,
                zIndex: 2,
            };
            const close_styles = {
                position: 'absolute',
                left: 740,
                top: 10,
                zIndex: 2,
            };
            const section_styles = {
                position: 'absolute',
                top: 80,
                left: '50%',
                transform: 'translate(-50%, 0%)',
                zIndex: 2,
            }
            return (
                <div style={div_styles}>
                    <img src={background} style={bg_styles} alt="" />
                    <img src={title} style={title_styles} alt="" />
                    <img src={close} style={close_styles} alt="" onClick={() => {this.onCloseClick()}} />
                    <table style={section_styles}>
                        <tbody>
                            <tr>
                                <td><SeedsButton /></td>
                                <td><TreesButton /></td>
                                <td><AnimalsButton /></td>
                                <td><BuildingsButton /></td>
                                <td><DecorationsButton /></td>
                                <td><ExpandButton /></td>
                                <td><TractorsButton /></td>
                            </tr>
                        </tbody>
                    </table>
                    <Seeds />
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}
