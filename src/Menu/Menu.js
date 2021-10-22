import React, { Component } from 'react'
import Friends from './Friends.js'
import Tools from './Tools.js'

export default class Menu extends Component {
    render() {
        const menu_div_styles = {
            position: 'absolute',
            display: 'block',
            bottom: 0,
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
                                <Friends />
                            </td>
                            <td>
                                <Tools hoeClick={() => this.props.hoeClick()} multiClick={() => this.props.multiClick()} marketClick={() => this.props.marketClick()} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
