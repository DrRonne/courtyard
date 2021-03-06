import React, { Component, createRef } from 'react'
import { ReactSession } from 'react-client-session';
import TileGrid from './TileGrid.js'
import Menu from './Menu/Menu.js'
import Topbar from './Topbar/Topbar.js'
import Market from './Market/Market.js'
import { server_ip, server_port, field_width, field_length, tree_length, tree_width } from './Constants.js';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.mode = "multi"; // Can maybe be an enum instead
        this.plantingSeed = null;
        this.gamedata = this.getGameData();
        this.taskqueue = [];
        this.characterTileX = 0;
        this.characterTileY = 0;
        this.tilegrid = createRef();
        this.market = createRef();
        this.topbar = createRef();
        this.state = {
            renderReady: false,
        }
    }

    addCoins(amount) {
        if (this.topbar && this.topbar.current) {
            const tb = this.topbar.current;
            if (tb.coins && tb.coins.current) {
                const c = tb.coins.current;
                c.setCoins(this.gamedata["coins"] + amount);
            }
        }
    }

    addExp(amount) {
        if (this.topbar && this.topbar.current) {
            const tb = this.topbar.current;
            if (tb.levelexp && tb.levelexp.current) {
                const e = tb.levelexp.current;
                e.addExp(amount);
            }
        }
    }

    setGridData(x, y, data) {
        this.gamedata["farmdata"]["farm-grid"][x][y] = data;
    }

    getGameData() {
        ReactSession.setStoreType("sessionStorage");
        fetch(`http://${server_ip}:${server_port}/GetFarmData`, {
            headers: { Authentication: `${ReactSession.get("token")}`
            }})
            .then(res => res.json())
            .then(json => {
                this.gamedata = json;
                this.setState({renderReady: true});
            })
    }

    hoeButtonClick() {
        this.mode = "hoe";
    }

    multiButtonClick() {
        this.mode = "multi";
    }

    marketButtonClick() {
        this.market.current.setVisible(!this.market.current.state.visible);
    }

    checkTilesTaken(originx, originy, width, height) {
        for (var y = originy; y > originy - height; y--) {
            if (!this.gamedata["farmdata"]["farm-grid"][y]) {
                return false;
            }
            for (var x = originx; x > originx - width; x--) {
                if (x < 0 || this.gamedata["farmdata"]["farm-grid"][y][x]) {
                    return false;
                }
            }
        }
        return true;
    }

    tileMouseHover(tile) {
        if (this.mode === "hoe") {
            if (!this.checkTilesTaken(tile.props.tilex, tile.props.tiley, field_width, field_length)) {
                tile.setBlueprint(field_width, field_length, false);
            }
            else {
                tile.setBlueprint(field_width, field_length, true);
            }
        }
        else if (this.mode === "plantingTree") {
            if (!this.checkTilesTaken(tile.props.tilex, tile.props.tiley, tree_width, tree_length)) {
                tile.setBlueprint(tree_width, tree_length, false);
            }
            else {
                tile.setBlueprint(tree_width, tree_length, true);
            }
        }
        else if (this.mode === "placingAnimal") {
            const animal_width = this.placingAnimal.width;
            const animal_length = this.placingAnimal.length;
            if (!this.checkTilesTaken(tile.props.tilex, tile.props.tiley, animal_width, animal_length)) {
                tile.setBlueprint(animal_width, animal_length, false);
            }
            else {
                tile.setBlueprint(animal_width, animal_length, true);
            }
        }
        else if (this.mode === "placingDecoration") {
            const deco_width = this.placingDecoration.width;
            const deco_length = this.placingDecoration.length;
            if (!this.checkTilesTaken(tile.props.tilex, tile.props.tiley, deco_width, deco_length)) {
                tile.setBlueprint(deco_width, deco_length, false);
            }
            else {
                tile.setBlueprint(deco_width, deco_length, true);
            }
        }
    }

    tileClick(tile) {
        if (this.mode === "hoe") {
            if (this.checkTilesTaken(tile.props.tilex, tile.props.tiley, field_width, field_length)) {
                this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                    type: "Field",
                    seed: null,
                    planted: null,
                    fertilized: false,
                    plown: false,
                    queued: true,
                };
                tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
                this.taskqueue.push({subject: tile, action: "plow"});
            }
        }
        else if (this.mode === "plantingTree") {
            if (this.checkTilesTaken(tile.props.tilex, tile.props.tiley, tree_width, tree_length)) {
                this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                    type: "Tree",
                    tree: this.plantingTree.name,
                    lastHarvested: null,
                    queued: true,
                }
                tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
                this.taskqueue.push({subject: tile, action: "plant tree"});
            }
        }
        else if (this.mode === "placingAnimal") {
            const animal_width = this.placingAnimal.width;
            const animal_length = this.placingAnimal.length;
            if (this.checkTilesTaken(tile.props.tilex, tile.props.tiley, animal_width, animal_length)) {
                this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                    type: "Animal",
                    animal: this.placingAnimal.name,
                    lastHarvested: null,
                    queued: true,
                }
                tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
                this.taskqueue.push({subject: tile, action: "place animal"});
            }
        }
        else if (this.mode === "placingDecoration") {
            const deco_width = this.placingDecoration.width;
            const deco_length = this.placingDecoration.length;
            if (this.checkTilesTaken(tile.props.tilex, tile.props.tiley, deco_width, deco_length)) {
                this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                    type: "Decoration",
                    decoration: this.placingDecoration.name,
                    queued: true,
                }
                tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
                this.taskqueue.push({subject: tile, action: "place decoration"});
            }
        }
    }

    decorationClick(tile) {
        console.log("not implemented");
    }

    treeClick(tile) {
        if (this.mode === "multi" && tile.action.current.state.tree && tile.action.current.state.lastHarvested && tile.action.current.state.tree_data &&
        tile.action.current.state.lastHarvested + tile.action.current.state.tree_data.time <= Date.now() / 1000) {
            this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                type: "Tree",
                tree: this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]["tree"],
                lastHarvested: this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]["lastHarvested"],
                queued: true,
            };
            tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
            this.taskqueue.push({subject: tile, action: "harvest tree"});
        }
    }

    animalClick(tile) {
        if (this.mode === "multi" && tile.action.current.state.animal_data.time &&
        tile.action.current.state.animal && tile.action.current.state.lastHarvested && tile.action.current.state.animal_data &&
        tile.action.current.state.lastHarvested + tile.action.current.state.animal_data.time <= Date.now() / 1000) {
            this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                type: "Animal",
                tree: this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]["animal"],
                lastHarvested: this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]["lastHarvested"],
                queued: true,
            };
            tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
            this.taskqueue.push({subject: tile, action: "harvest animal"});
        }
    }

    fieldClick(tile) {
        if (this.mode === "hoe" && !tile.action.current.state.plown) {
            this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                type: "Field",
                seed: null,
                planted: null,
                fertilized: false,
                plown: false,
                queued: true,
            };
            tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
            this.taskqueue.push({subject: tile, action: "plow"});
        }
        else if (this.mode === "plantingSeed" && this.plantingSeed && tile.action.current.state.plown && !tile.action.current.state.seed) {
            this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                type: "Field",
                seed: null,
                planted: null,
                fertilized: false,
                plown: true,
                queued: true,
            };
            tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
            this.taskqueue.push({subject: tile, action: "plant", data: this.plantingSeed.name});
        }
        else if (this.mode === "multi" && tile.action.current.state.seed && tile.action.current.state.planted && tile.action.current.state.seed_data &&
        tile.action.current.state.planted + tile.action.current.state.seed_data.time <= Date.now() / 1000) {
            this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex] = {
                type: "Field",
                seed: this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]["seed"],
                planted: this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]["planted"],
                fertilized: this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]["fertilized"],
                plown: true,
                queued: true,
            };
            tile.setTileData(this.gamedata["farmdata"]["farm-grid"][tile.props.tiley][tile.props.tilex]);
            this.taskqueue.push({subject: tile, action: "harvest"});
        }
    }

    seedBuyClick(seedData) {
        this.mode = "plantingSeed";
        this.plantingSeed = seedData;
        this.market.current.setVisible(false);
    }

    treeBuyClick(treeData) {
        this.mode = "plantingTree";
        this.plantingTree = treeData;
        this.market.current.setVisible(false);
    }

    animalBuyClick(animalData) {
        this.mode = "placingAnimal";
        this.placingAnimal = animalData;
        this.market.current.setVisible(false);
    }

    decorationBuyClick(decorationData) {
        this.mode = "placingDecoration";
        this.placingDecoration = decorationData;
        this.market.current.setVisible(false);
    }

    componentDidMount() {
        setInterval(() => {
            if (this.taskqueue.length > 0) {
                const task = this.taskqueue[0];
                if (task.action === "plow") {
                    const tile = task.subject;
                    tile.action.current.plow();
                    tile.action.current.setQueued(false);
                }
                else if (task.action === "plant") {
                    const tile = task.subject;
                    tile.action.current.plant(task.data);
                    tile.action.current.setQueued(false);
                }
                else if (task.action === "harvest") {
                    const tile = task.subject;
                    tile.action.current.harvest();
                    tile.action.current.setQueued(false);
                }
                else if (task.action === "plant tree") {
                    const tile = task.subject;
                    tile.action.current.plant();
                    tile.action.current.setQueued(false);
                }
                else if (task.action === "place animal") {
                    const tile = task.subject;
                    tile.action.current.place();
                    tile.action.current.setQueued(false);
                }
                else if (task.action === "place decoration") {
                    const tile = task.subject;
                    tile.action.current.place();
                    tile.action.current.setQueued(false);
                }
                else if (task.action === "harvest tree") {
                    const tile = task.subject;
                    tile.action.current.harvest();
                    tile.action.current.setQueued(false);
                }
                else if (task.action === "harvest animal") {
                    const tile = task.subject;
                    tile.action.current.harvest();
                    tile.action.current.setQueued(false);
                }
                this.taskqueue.shift();
            }
        }, 100);
    }

    render() {
        if (this.state.renderReady) {
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
                        <TileGrid ref={this.tilegrid} characterPosX={0} characterPosY={0} characterTileX={this.characterTileX} characterTileY={this.characterTileY}
                            farmheight={this.gamedata["farmdata"]["farm-height"]} farmwidth={this.gamedata["farmdata"]["farm-height"]} farmgrid={this.gamedata["farmdata"]["farm-grid"]}
                            tileMouseHover={(tile) => this.tileMouseHover(tile)} tileClick={(tile) => this.tileClick(tile)} fieldClick={(tile) => this.fieldClick(tile)}
                            treeClick={(tile) => this.treeClick(tile)} animalClick={(tile) => this.animalClick(tile)} decorationClick={(tile) => this.decorationClick(tile)}
                            setGridData={(x, y, data) => this.setGridData(x, y, data)} addCoins={(amount) => this.addCoins(amount)} addExp={(amount) => this.addExp(amount)} />
                    </div>
                    <Topbar ref={this.topbar} coins={this.gamedata["coins"]} cash={this.gamedata["cash"]} level={this.gamedata["level"]}
                        experience={this.gamedata["experience"]} farmname={this.gamedata["farmdata"]["farm-name"]} />
                    <Menu hoeClick={() => this.hoeButtonClick()} multiClick={() => this.multiButtonClick()} marketClick={() => this.marketButtonClick()} />
                    <Market ref={this.market} seedBuyClick={(seedData) => this.seedBuyClick(seedData)} treeBuyClick={(treeData) => this.treeBuyClick(treeData)}
                        animalBuyClick={(animalData) => this.animalBuyClick(animalData)} decorationBuyClick={(decorationData) => this.decorationBuyClick(decorationData)} />
                </div>
            )
        }
        return (
            <div></div>
        )
    }
}
