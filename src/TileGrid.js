import React, { Component } from 'react'
import Tile from './Tile.js'
const { v4: uuidv4 } = require('uuid');

export default class TileGrid extends Component {
    render() {
        const max_y_translate = -this.props.farmheight*26;
        const styles = { 
            transform: `translate(${-103/2 + 1280/2}px, ${max_y_translate/2 + 720/2}px)` 
        };

        const items = [];

        for (var i = 0; i < this.props.farmheight; i++)
        {
            const row = [];
            for (var j = 0; j < this.props.farmwidth; j++)
            {
                row.push(<td><Tile key={uuidv4()} tiley={i} tilex={j} tiledata={this.props.farmgrid[i][j]} onMouseEnter={(tile) => this.props.tileMouseHover(tile)} onClick={(tile) => this.props.tileClick(tile)} /></td>);
            }
            items.push(<tr>{row}</tr>);
        }
        return (
            <div style={styles} class="TileGrid">
                <table>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        )
    }
}
