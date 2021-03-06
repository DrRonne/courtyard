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
import Trees from './Sections/Trees'
import Animals from './Sections/Animals'
import Decorations from './Sections/Decorations'

export default class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            sectionshow: "Seeds",
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

    onSeedsButtonClick() {
        this.setState({
            visible: this.state.visible,
            sectionshow: "Seeds",
        });
    }

    onTreesButtonClick() {
        this.setState({
            visible: this.state.visible,
            sectionshow: "Trees",
        });
    }

    onAnimalsButtonClick() {
        this.setState({
            visible: this.state.visible,
            sectionshow: "Animals",
        });
    }

    onDecorationsButtonClick() {
        this.setState({
            visible: this.state.visible,
            sectionshow: "Decorations",
        });
    }

    render() {
        if (this.state.visible) {
            let shownsection;
            if (this.state.sectionshow === "Seeds") {
                shownsection = <Seeds seedBuyClick={(seedData) => this.props.seedBuyClick(seedData)} />
            }
            else if (this.state.sectionshow === "Trees") {
                shownsection = <Trees treeBuyClick={(treeData) => this.props.treeBuyClick(treeData)} />
            }
            else if (this.state.sectionshow === "Animals") {
                shownsection = <Animals animalBuyClick={(animalData) => this.props.animalBuyClick(animalData)} />
            }
            else if (this.state.sectionshow === "Decorations") {
                shownsection = <Decorations decorationBuyClick={(decorationData) => this.props.decorationBuyClick(decorationData)} />
            }
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
                top: 100,
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
                                <td><SeedsButton onSeedsButtonClick={() => {this.onSeedsButtonClick()}} /></td>
                                <td><TreesButton onTreesButtonClick={() => {this.onTreesButtonClick()}} /></td>
                                <td><AnimalsButton onAnimalsButtonClick={() => {this.onAnimalsButtonClick()}} /></td>
                                <td><BuildingsButton /></td>
                                <td><DecorationsButton onDecorationsButtonClick={() => {this.onDecorationsButtonClick()}} /></td>
                                <td><ExpandButton /></td>
                                <td><TractorsButton /></td>
                            </tr>
                        </tbody>
                    </table>
                    {shownsection}
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
