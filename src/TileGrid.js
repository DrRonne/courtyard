import React, { Component, createRef } from 'react'
import Tile from './Tile.js'
import { tile_width } from './Constants.js';
const { v4: uuidv4 } = require('uuid');

export default class TileGrid extends Component {
    constructor(props) {
        super(props);
        this.characterTileX = this.props.characterTileX;
        this.characterTileY = this.props.characterTileY;
        this.characterPosX = this.props.characterPosX;
        this.characterPosY = this.props.characterPosY;
        this.state = {
            xOffset: 0,
            yOffset: 0,
        }
        this.items = [];
        this.itemrefs = [];
        for (var h = 0; h < this.props.farmheight; h++) {
            this.itemrefs.push([])
            for (var w = 0; w < this.props.farmwidth; w++) {
                this.itemrefs[h].push(createRef());
            }
        }
    }

    // moveCharacterToPosition(x, y) {
    //     // Translate orthogonal x, y coordinates to this weird skewed system
    //     const realX = x;
    //     const realY = y;
    //     const currentTile = this.itemrefs[this.characterTileX][this.characterTileY].current;
    // }

    moveCharacterToTile(tileX, tileY) {
        // Do one step closer to destination
        // const directionX = tileX - this.characterTileX;
        // const directionY = tileY - this.characterTileY;
        // const directionSize = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2));
        // const normalDirectionX = directionX / directionSize;
        // const normalDirectionY = directionY / directionSize;
        // const speed = 3;

        // const currentTile = this.itemrefs[this.characterTileX][this.characterTileY].current;
        // const currentX = currentTile.state.characterPosX;
        // const currentY = currentTile.state.characterPosY;
        // const newPosX = currentX + normalDirectionX * speed;
        // const newPosY = currentY + normalDirectionY * speed;
        // let h = 1;
        // let w = 1;
        // if (currentTile.state.tiledata) {
        //     w = currentTile.state.tiledata.width;
        //     h = currentTile.state.tiledata.height;
        // }

        // currentTile.moveCharacter(newPosX, newPosY);

    }

    render() {
        const max_y_translate = -this.props.farmheight*26;
        const styles = { 
            transform: `translate(${-tile_width * 1.6 / 2 + 1280/2 + this.state.xOffset}px, ${max_y_translate/2 + 720/2 + this.state.yOffset}px)` 
        };

        this.items = [];

        for (var i = 0; i < this.props.farmheight; i++)
        {
            const row = [];
            for (var j = 0; j < this.props.farmwidth; j++)
            {
                // if (i === this.characterTileY && j === this.characterTileX) {
                //     row.push(<td><Tile ref={this.itemrefs[i][j]} key={uuidv4()} hasCharacter={true} characterPosX={0} characterPosY={0} tiley={i} tilex={j} tiledata={this.props.farmgrid[i][j]} onMouseEnter={(tile) => this.props.tileMouseHover(tile)} onClick={(tile) => this.props.tileClick(tile)} fieldClick={(tile) => this.props.fieldClick(tile)} /></td>);
                // }
                // else {
                    row.push(<td><Tile ref={this.itemrefs[i][j]} key={uuidv4()} hasCharacter={false} characterPosX={0} characterPosY={0} tiley={i} tilex={j}
                        tiledata={this.props.farmgrid[i][j]} onMouseEnter={(tile) => this.props.tileMouseHover(tile)} onClick={(tile) => this.props.tileClick(tile)}
                        fieldClick={(tile) => this.props.fieldClick(tile)} setGridData={(x, y, data) => this.props.setGridData(x, y, data)} /></td>);
                // }
            }
            this.items.push(<tr>{row}</tr>);
        }
        return (
            <div style={styles} class="TileGrid">
                <table>
                    <tbody>
                        {this.items}
                    </tbody>
                </table>
            </div>
        )
    }
}
