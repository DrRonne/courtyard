import React, { Component } from 'react'
import TileGrid from './TileGrid.js'
import Menu from './Menu/Menu.js'
import Topbar from './Topbar/Topbar.js'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.mode = "multi"; // Can maybe be an enum instead
        this.gamedata = this.getGameData();
    }

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
            fertilized: false,
            plown: true,
        };
        farmgrid[6][8] = {
            type: "Field",
            seed: "Asparagus",
            planted: (Date.now() / 1000) - 23040,
            fertilized: false,
            plown: true,
        };
        farmgrid[6][6] = {
            type: "Field",
            seed: "Asparagus",
            planted: (Date.now() / 1000) - 46080,
            fertilized: false,
            plown: true,
        };
        farmgrid[8][6] = {
            type: "Field",
            seed: "Asparagus",
            planted: (Date.now() / 1000) - 74880,
            fertilized: false,
            plown: true,
        };
        farmgrid[10][10] = {
            type: "Field",
            seed: null,
            planted: null,
            fertilized: false,
            plown: true,
        };
        farmgrid[12][10] = {
            type: "Field",
            seed: null,
            planted: null,
            fertilized: false,
            plown: false,
        };
        return {
            "farm-name": "test farm",
            "farm-width": 100,
            "farm-length": 100,
            "farm-grid": farmgrid,
        };
    }

    hoeButtonClick() {
        this.mode = "hoe";
    }

    multiButtonClick() {
        this.mode = "multi";
    }

    checkTilesTaken(originx, originy, width, height) {
        for (var y = originy; y > originy - height; y--) {
            if (!this.gamedata["farm-grid"][y]) {
                return false;
            }
            for (var x = originx; x > originx - width; x--) {
                if (x < 0 || this.gamedata["farm-grid"][y][x]) {
                    return false;
                }
            }
        }
        return true;
    }

    tileMouseHover(tile) {
        if (this.mode === "hoe") {
            if (!this.checkTilesTaken(tile.props.tilex, tile.props.tiley, 2, 2)) {
                tile.setBlueprint(2, 2, false);
            }
            else {
                tile.setBlueprint(2, 2, true);
            }
        }
    }

    tileClick(tile) {
        if (this.mode === "hoe") {
            if (this.checkTilesTaken(tile.props.tilex, tile.props.tiley, 2, 2)) {
                this.gamedata["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                    type: "Field",
                    seed: null,
                    planted: null,
                    fertilized: false,
                    plown: false,
                };
                tile.setTileData(this.gamedata["farm-grid"][tile.props.tiley][tile.props.tilex]);
            }
        }
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
                    <TileGrid farmheight={20} farmwidth={20} farmgrid={this.gamedata["farm-grid"]} tileMouseHover={(tile) => this.tileMouseHover(tile)} tileClick={(tile) => this.tileClick(tile)} />
                </div>
                <Topbar />
                <Menu hoeClick={() => this.hoeButtonClick()} multiClick={() => this.multiButtonClick()} />
            </div>
        )
    }
}
