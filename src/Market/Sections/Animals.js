import React, { Component } from 'react'
import background from '../../assets/market/shop_section_background.png'
import rightArrow from '../../assets/market/arrow_right.png'
import leftArrow from '../../assets/market/arrow_left.png'
import Animal from './ShopItems/Animal';
import { server_ip, server_port } from '../../Constants'

export default class Animals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            data: null,
        }
        fetch(`http://${server_ip}:${server_port}/GetSupportedAnimals`)
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
            let animal1Elem;
            if (data.length > this.state.page*6) {
                const animal1 = data[this.state.page*6]
                animal1Elem = <Animal name={animal1.name} sell={animal1.sellprice} time={animal1.time} price={animal1.cost} width={animal1.width} length={animal1.length}
                    animalBuyClick={(animalData) => this.props.animalBuyClick(animalData)} />
            }
            let animal2Elem;
            if (data.length > this.state.page*6 + 1) {
                const animal2 = data[this.state.page*6 + 1]
                animal2Elem = <Animal name={animal2.name} sell={animal2.sellprice} time={animal2.time} price={animal2.cost} width={animal2.width} length={animal2.length}
                    animalBuyClick={(animalData) => this.props.animalBuyClick(animalData)} />
            }
            let animal3Elem;
            if (data.length > this.state.page*6 + 2) {
                const animal3 = data[this.state.page*6 + 2]
                animal3Elem = <Animal name={animal3.name} sell={animal3.sellprice} time={animal3.time} price={animal3.cost} width={animal3.width} length={animal3.length}
                    animalBuyClick={(animalData) => this.props.animalBuyClick(animalData)} />
            }
            let animal4Elem;
            if (data.length > this.state.page*6 + 3) {
                const animal4 = data[this.state.page*6 + 3]
                animal4Elem = <Animal name={animal4.name} sell={animal4.sellprice} time={animal4.time} price={animal4.cost} width={animal4.width} length={animal4.length}
                    animalBuyClick={(animalData) => this.props.animalBuyClick(animalData)} />
            }
            let animal5Elem;
            if (data.length > this.state.page*6 + 4) {
                const animal5 = data[this.state.page*6 + 4]
                animal5Elem = <Animal name={animal5.name} sell={animal5.sellprice} time={animal5.time} price={animal5.cost} width={animal5.width} length={animal5.length}
                animalBuyClick={(animalData) => this.props.animalBuyClick(animalData)} />
            }
            let animal6Elem;
            if (data.length > this.state.page*6 + 5) {
                const animal6 = data[this.state.page*6 + 5]
                animal6Elem = <Animal name={animal6.name} sell={animal6.sellprice} time={animal6.time} price={animal6.cost} width={animal6.width} length={animal6.length}
                animalBuyClick={(animalData) => this.props.animalBuyClick(animalData)} />
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
                                <td>{animal1Elem}</td>
                                <td>{animal2Elem}</td>
                                <td>{animal3Elem}</td>
                            </tr>
                            <tr>
                                <td>{animal4Elem}</td>
                                <td>{animal5Elem}</td>
                                <td>{animal6Elem}</td>
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
