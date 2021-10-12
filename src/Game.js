import React, { Component } from 'react'
import TileGrid from './TileGrid.js'

export default class Game extends Component {

    getGameData() {
        const farmgrid = []
        for (var i = 0; i < 10; i++)
        {
            const row = []
            for (var j = 0; j < 10; j++)
            {
                row.push(null);
            }
            farmgrid.push(row);
        }
        farmgrid[8][8] = "Field";
        farmgrid[6][8] = "Field";
        farmgrid[6][6] = "Field";
        farmgrid[8][6] = "Field";
        return {
            "farm-name": "test farm",
            "farm-width": 100,
            "farm-length": 100,
            "farm-grid": farmgrid,
        };
    }

    render() {
        return (
            <div>
                <TileGrid farmheight={10} farmwidth={10} farmgrid={this.getGameData()["farm-grid"]} />
            </div>
        )
    }
}
