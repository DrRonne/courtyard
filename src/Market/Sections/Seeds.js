import React, { Component } from 'react'
import background from '../../assets/market/shop_section_background.png'
import rightArrow from '../../assets/market/arrow_right.png'
import leftArrow from '../../assets/market/arrow_left.png'
import Seed from './ShopItems/Seed';
import { server_ip, server_port } from '../../Constants';

export default class Seeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            data: null,
        }
        fetch(`http://${server_ip}:${server_port}/GetSupportedSeeds`)
            .then(res => res.json())
            .then(json => {
                this.setState({page: this.state.page, data: json});
            })
    }

    rightArrowClick() {
        if (this.state.page < this.state.data.length / 6 - 1) {
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
        const data = this.state.data;
        if (data) {
            let seed1Elem;
            if (data.length > this.state.page*6) {
                const seed1 = data[this.state.page*6]
                seed1Elem = <Seed name={seed1.name} sell={seed1.sellprice} time={seed1.time} price={seed1.cost} seedBuyClick={(seedData) => this.props.seedBuyClick(seedData)} />
            }
            let seed2Elem;
            if (data.length > this.state.page*6 + 1) {
                const seed2 = data[this.state.page*6 + 1]
                seed2Elem = <Seed name={seed2.name} sell={seed2.sellprice} time={seed2.time} price={seed2.cost} seedBuyClick={(seedData) => this.props.seedBuyClick(seedData)} />
            }
            let seed3Elem;
            if (data.length > this.state.page*6 + 2) {
                const seed3 = data[this.state.page*6 + 2]
                seed3Elem = <Seed name={seed3.name} sell={seed3.sellprice} time={seed3.time} price={seed3.cost} seedBuyClick={(seedData) => this.props.seedBuyClick(seedData)} />
            }
            let seed4Elem;
            if (data.length > this.state.page*6 + 3) {
                const seed4 = data[this.state.page*6 + 3]
                seed4Elem = <Seed name={seed4.name} sell={seed4.sellprice} time={seed4.time} price={seed4.cost} seedBuyClick={(seedData) => this.props.seedBuyClick(seedData)} />
            }
            let seed5Elem;
            if (data.length > this.state.page*6 + 4) {
                const seed5 = data[this.state.page*6 + 4]
                seed5Elem = <Seed name={seed5.name} sell={seed5.sellprice} time={seed5.time} price={seed5.cost} seedBuyClick={(seedData) => this.props.seedBuyClick(seedData)} />
            }
            let seed6Elem;
            if (data.length > this.state.page*6 + 5) {
                const seed6 = data[this.state.page*6 + 5]
                seed6Elem = <Seed name={seed6.name} sell={seed6.sellprice} time={seed6.time} price={seed6.cost} seedBuyClick={(seedData) => this.props.seedBuyClick(seedData)} />
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
                                <td>{seed1Elem}</td>
                                <td>{seed2Elem}</td>
                                <td>{seed3Elem}</td>
                            </tr>
                            <tr>
                                <td>{seed4Elem}</td>
                                <td>{seed5Elem}</td>
                                <td>{seed6Elem}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return (
                <div />
            )
        }
    }
}
