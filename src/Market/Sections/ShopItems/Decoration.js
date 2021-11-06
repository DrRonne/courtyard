import React, { Component } from 'react'
import background from '../../../assets/market/item_background.png'
import iconBackground from '../../../assets/market/icon_background.png'
import coin from '../../../assets/market/coins_icon.png'
import buy from '../../../assets/market/buy_button.png'

export default class Decoration extends Component {

    render() {
        const div_styles = {
            position: 'relative',
            margin: 5,
        };
        const title_style = {
            position: 'absolute',
            top: 10,
            fontSize: 20,
            lineHeight: '10px',
            color: 'green',
            textAlign: 'center',
            zIndex: 2,
            left: '50%',
            width: '100%',
            transform: 'translate(-50%, -50%)',
        };
        const icon_styles = {
            position: 'absolute',
            top: 22,
            zIndex: 1,
            left: '50%',
            transform: 'translate(-50%, 0%)',
        };
        const actual_icon_styles = {
            position: 'absolute',
            top: 22,
            width: 80,
            height: 80,
            zIndex: 2,
            left: '50%',
            transform: 'translate(-50%, 0%)',
        };
        const price_table_styles = {
            position: 'absolute',
            top: 155,
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
        const coin_icon_styles = {
            width: 25,
            height: 25,
        };
        const price_styles = {
            fontSize: 25,
            color: 'green',
        };
        const buy_styles = {
            position: 'absolute',
            top: 185,
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
        const icon = "/assets/decorations/" + this.props.name + "/" + this.props.name + "_icon.png";
        return (
            <div style={div_styles}>
                <img src={background} alt="" />
                <div style={title_style}><strong>{this.props.name}</strong></div>
                <img src={iconBackground} style={icon_styles} alt="" />
                <img src={icon} style={actual_icon_styles} alt="" />
                <table style={price_table_styles}>
                    <tbody>
                        <tr>
                            <td><img src={coin} style={coin_icon_styles} alt="" /></td>
                            <td style={price_styles}><strong>{this.props.price}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <img src={buy} style={buy_styles} alt="" onClick={() => this.props.decorationBuyClick(this.props)}/>
            </div>
        )
    }
}
