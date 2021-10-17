import React, { Component } from 'react'
import Coins from './Coins'
import Dollars from './Dollars'
import Experience from './Experience'
import FarmName from './FarmName'

export default class Topbar extends Component {
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
                                <Coins />
                            </td>
                            <td>
                                <Dollars />
                            </td>
                            <td>
                                <Experience exp={550} level={1} exp_required={1234} />
                            </td>
                            <td>
                                <FarmName name={"sample name"} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
