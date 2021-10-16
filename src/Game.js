import React, { Component } from 'react'
import TileGrid from './TileGrid.js'
import Menu from './Menu/Menu.js'
import Topbar from './Topbar/Topbar.js'

export default class Game extends Component {

    getGameData() {
        const farmgrid = []
        for (var i = 0; i < 30; i++)
        {
            const row = []
            for (var j = 0; j < 30; j++)
            {
                row.push(null);
            }
            farmgrid.push(row);
        }
        farmgrid[8][8] = {
            type: "Field",
            seed: "Asparagus",
            planted: (Date.now() / 1000),
            fertilized: false
        };
        farmgrid[6][8] = {
            type: "Field",
            seed: "Asparagus",
            planted: (Date.now() / 1000) - 23040,
            fertilized: false
        };
        farmgrid[6][6] = {
            type: "Field",
            seed: "Asparagus",
            planted: (Date.now() / 1000) - 46080,
            fertilized: false
        };
        farmgrid[8][6] = {
            type: "Field",
            seed: "Asparagus",
            planted: (Date.now() / 1000) - 74880,
            fertilized: false
        };
        return {
            "farm-name": "test farm",
            "farm-width": 100,
            "farm-length": 100,
            "farm-grid": farmgrid,
        };
    }

    render() {
        const game_bg_styles = {
            background: '#43a143',
            width: 1280,
            height: 720,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
        }
        const tilegrid_container_styles = {
            overflow: 'hidden',
            width: 1280,
            height: 720,
        }
        return (
            <div style={game_bg_styles}>
                <div style={tilegrid_container_styles}>
                    <TileGrid farmheight={20} farmwidth={20} farmgrid={this.getGameData()["farm-grid"]} />
                </div>
                <Topbar />
                <Menu />
            </div>
        )
    }
}
