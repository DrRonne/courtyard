import React, { Component } from 'react'
import background from '../../assets/market/shop_section_background.png'
import rightArrow from '../../assets/market/arrow_right.png'
import leftArrow from '../../assets/market/arrow_left.png'
import Seed from './ShopItems/Seed';

export default class Seeds extends Component {
    render() {
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
        return (
            <div style={div_styles}>
                <img src={background} style={bg_styles} alt="" />
                <img src={leftArrow} style={left_styles} alt="" />
                <img src={rightArrow} style={right_styles} alt="" />
                <table style={table_styles}>
                    <tbody>
                        <tr>
                            <td><Seed name={"Asparagus"} sell={123} time={3600} price={454}/></td>
                            <td><Seed name={"Strawberry"} sell={123} time={7200} price={4567}/></td>
                            <td><Seed name={"Cabbage"} sell={123} time={120} price={45}/></td>
                        </tr>
                        <tr>
                            <td><Seed name={"Pumpkin"} sell={123} time={60} price={44535}/></td>
                            <td><Seed name={"Carrot"} sell={123} time={1} price={465435}/></td>
                            <td><Seed name={"Tomato"} sell={123} time={86400} price={44534535}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
