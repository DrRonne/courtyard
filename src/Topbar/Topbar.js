import React, { Component, createRef } from 'react'
import Coins from './Coins'
import Dollars from './Dollars'
import Experience from './Experience'
import FarmName from './FarmName'

export default class Topbar extends Component {
    constructor(props) {
        super(props);
        this.coins = createRef();
        this.cash = createRef();
        this.levelexp = createRef();
    }

    render() {
        const menu_div_styles = {
            position: 'absolute',
            display: 'block',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, 0%)',
        }
        const friends_parent_styles = {
            position: 'relative',
        }
        return (
            <div style={menu_div_styles}>
                <table>
                    <tbody>
                        <tr>
                            <td style={friends_parent_styles}>
                                <Coins ref={this.coins} value={this.props.coins} />
                            </td>
                            <td>
                                <Dollars ref={this.cash} value={this.props.cash} />
                            </td>
                            <td>
                                <Experience ref={this.levelexp} exp={this.props.experience} level={this.props.level} />
                            </td>
                            <td>
                                <FarmName name={this.props.farmname} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
