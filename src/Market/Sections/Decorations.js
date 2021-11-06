import React, { Component } from 'react'
import background from '../../assets/market/shop_section_background.png'
import rightArrow from '../../assets/market/arrow_right.png'
import leftArrow from '../../assets/market/arrow_left.png'
import data from '../../resources/supported_decoration_stats.json'
import Decoration from './ShopItems/Decoration';

export default class Decorations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    }

    rightArrowClick() {
        if (this.state.page < data.length / 6 - 1) {
            const statecopy = {...this.state};
            statecopy.page += 1;
            this.setState(statecopy);
        }
    }

    leftArrowClick() {
        if (this.state.page > 0) {
            const statecopy = {...this.state};
            statecopy.page -= 1;
            this.setState(statecopy);
        }
    }

    render() {
        let decoration1Elem;
        if (data.length > this.state.page*6) {
            const decoration1 = data[this.state.page*6]
            decoration1Elem = <Decoration name={decoration1.name} price={decoration1.cost} width={decoration1.width} length={decoration1.length}
                decorationBuyClick={(decorationData) => this.props.decorationBuyClick(decorationData)} />
        }
        let decoration2Elem;
        if (data.length > this.state.page*6 + 1) {
            const decoration2 = data[this.state.page*6 + 1]
            decoration2Elem = <Decoration name={decoration2.name} price={decoration2.cost} width={decoration2.width} length={decoration2.length}
                decorationBuyClick={(decorationData) => this.props.decorationBuyClick(decorationData)} />
        }
        let decoration3Elem;
        if (data.length > this.state.page*6 + 2) {
            const decoration3 = data[this.state.page*6 + 2]
            decoration3Elem = <Decoration name={decoration3.name} price={decoration3.cost} width={decoration3.width} length={decoration3.length}
                decorationBuyClick={(decorationData) => this.props.decorationBuyClick(decorationData)} />
        }
        let decoration4Elem;
        if (data.length > this.state.page*6 + 3) {
            const decoration4 = data[this.state.page*6 + 3]
            decoration4Elem = <Decoration name={decoration4.name} price={decoration4.cost} width={decoration4.width} length={decoration4.length}
                decorationBuyClick={(decorationData) => this.props.decorationBuyClick(decorationData)} />
        }
        let decoration5Elem;
        if (data.length > this.state.page*6 + 4) {
            const decoration5 = data[this.state.page*6 + 4]
            decoration5Elem = <Decoration name={decoration5.name} price={decoration5.cost} width={decoration5.width} length={decoration5.length}
            decorationBuyClick={(decorationData) => this.props.decorationBuyClick(decorationData)} />
        }
        let decoration6Elem;
        if (data.length > this.state.page*6 + 5) {
            const decoration6 = data[this.state.page*6 + 5]
            decoration6Elem = <Decoration name={decoration6.name} price={decoration6.cost} width={decoration6.width} length={decoration6.length}
            decorationBuyClick={(decorationData) => this.props.decorationBuyClick(decorationData)} />
        }
        const div_styles = {
            position: 'absolute',
            top: 140,
            left: '50%',
            transform: 'translate(-50%, 0%)',
        };
        const bg_styles = {
            position: 'relative',
        };
        const left_styles = {
            position: 'absolute',
            top: '50%',
            left: -90,
            transform: 'translate(0%, -50%)',
        };
        const right_styles = {
            position: 'absolute',
            top: '50%',
            right: -90,
            transform: 'translate(0%, -50%)',
        };
        const table_styles = {
            position: 'absolute',
            left: '50%',
            top: 8,
            transform: 'translate(-50%, 0%)',
        };
        let leftArrowElem;
        if (this.state.page > 0 ) {
            leftArrowElem = <img src={leftArrow} style={left_styles} onClick={() => this.leftArrowClick()} alt="" />
        }
        let rightArrowElem;
        if (this.state.page < data.length / 6 - 1) {
            rightArrowElem = <img src={rightArrow} style={right_styles} onClick={() => this.rightArrowClick()} alt="" />
        }
        return (
            <div style={div_styles}>
                <img src={background} style={bg_styles} alt="" />
                {leftArrowElem}
                {rightArrowElem}
                <table style={table_styles}>
                    <tbody>
                        <tr>
                            <td>{decoration1Elem}</td>
                            <td>{decoration2Elem}</td>
                            <td>{decoration3Elem}</td>
                        </tr>
                        <tr>
                            <td>{decoration4Elem}</td>
                            <td>{decoration5Elem}</td>
                            <td>{decoration6Elem}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
