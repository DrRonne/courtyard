import React, { Component } from 'react'
import background from '../../../assets/market/item_background.png'
import iconBackground from '../../../assets/market/icon_background.png'
import coin from '../../../assets/market/coins_icon.png'
import buy from '../../../assets/market/buy_button.png'

export default class Tree extends Component {
    convertSecondsToTimeString(seconds) {
        var str = "";
        if (seconds >= 86400) {
            const days = Math.floor(seconds / 86400);
            seconds %= 86400;
            str += days;
            if (days > 1) {
                str += " days";
            }
            else {
                str += " day";
            }
        }
        if (seconds >= 3600) {
            const hours = Math.floor(seconds / 3600);
            seconds %= 3600;
            if (str.length > 0) {
                str += ", ";
            }
            str += hours;
            if (hours > 1) {
                str += " hours";
            }
            else {
                str += " hour";
            }
        }
        if (seconds >= 60) {
            const minutes = Math.floor(seconds / 60);
            seconds %= 60;
            if (str.length > 0) {
                str += ", ";
            }
            str += minutes;
            if (minutes > 1) {
                str += " minutes";
            }
            else {
                str += " minute";
            }
        }
        if (seconds > 0) {
            if (str.length > 0) {
                str += ", ";
            }
            str += seconds;
            if (seconds > 1) {
                str += " seconds";
            }
            else {
                str += " second";
            }
        }
        return str;
    }

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
        const sell_style = {
            position: 'absolute',
            top: 112,
            fontSize: 18,
            width: 180,
            color: 'green',
            textAlign: 'center',
            zIndex: 2,
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
        const harvest_style = {
            position: 'absolute',
            top: 130,
            fontSize: 18,
            width: 180,
            lineHeight: '10px',
            color: 'green',
            textAlign: 'center',
            zIndex: 2,
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
        const icon = "/assets/trees/" + this.props.name + "/" + this.props.name + "_icon.png";
        return (
            <div style={div_styles}>
                <img src={background} alt="" />
                <div style={title_style}><strong>{this.props.name}</strong></div>
                <img src={iconBackground} style={icon_styles} alt="" />
                <img src={icon} style={actual_icon_styles} alt="" />
                <div style={sell_style}>Sell for: {this.props.sell} coins</div>
                <div style={harvest_style}>Harvest in: {this.convertSecondsToTimeString(this.props.time)}</div>
                <table style={price_table_styles}>
                    <tbody>
                        <tr>
                            <td><img src={coin} style={coin_icon_styles} alt="" /></td>
                            <td style={price_styles}><strong>{this.props.price}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <img src={buy} style={buy_styles} alt="" onClick={() => this.props.treeBuyClick(this.props)}/>
            </div>
        )
    }
}
