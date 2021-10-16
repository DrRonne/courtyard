import React, { Component } from 'react'
import background from '../assets/menu/tools_background.png'
import Cursor from './ToolButtons/Cursor';
import Hoe from './ToolButtons/Hoe';
import Recycle from './ToolButtons/Recycle';
import Ribbon from './ToolButtons/Ribbon';
import Market from './ToolButtons/Market';
import Gift from './ToolButtons/Gift';

export default class Tools extends Component {
    render() {
        const div_styles = {
            position: 'relative',
        };
        const bg_styles = { 
            width: 130,
            height: 110,
            zIndex: 1,
        };
        const table_styles = {
            top: 0,
            left: 0,
            margin: 5,
            position: 'absolute',
            zIndex: 2,
        }
        return (
            <div style={div_styles}>
                <img src={background} style={bg_styles} alt=""/>
                <table style={table_styles}>
                    <tbody>
                        <tr>
                            <td>
                                <Cursor />
                            </td>
                            <td>
                                <Hoe />
                            </td>
                            <td>
                                <Recycle />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Ribbon />
                            </td>
                            <td>
                                <Market />
                            </td>
                            <td>
                                <Gift />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
