import React, { Component, createRef } from 'react'
import grass from './assets/grass.png'
import Blueprint from './Blueprint.js'
import Field from './Field.js'
import TreeEntity from './TreeEntity'
import AnimalEntity from './AnimalEntity'
import { field_length, field_width, tile_length, tile_width, tree_length, tree_width } from './Constants'
// import Character from './Character.js'

export default class Tile extends Component {
    constructor(props) {
        super(props);
        this.action = createRef();
        this.state = {
            tiledata: this.props.tiledata,
            placement_blueprint_width: 0,
            placement_blueprint_height: 0,
            placement_valid: false,
            characterPosX: this.props.characterPosX,
            characterPosY: this.props.characterPosY,
            hasCharacter: this.props.hasCharacter,
        }
    }

    moveCharacter(x, y) {
        const statecopy = {...this.state};
        statecopy.characterPosX = x;
        statecopy.characterPosY = y;
        this.setState(statecopy);
    }

    setTileData(tiledata) {
        const statecopy = {...this.state};
        statecopy.tiledata = tiledata;
        this.setState(statecopy);
    }

    setBlueprint(width, height, valid) {
        const statecopy = {...this.state};
        statecopy.placement_blueprint_height = height;
        statecopy.placement_blueprint_width = width;
        statecopy.placement_valid = valid;
        this.setState(statecopy);
    }

    onMouseLeave() {
        const statecopy = {...this.state};
        statecopy.placement_blueprint_height = 0;
        statecopy.placement_blueprint_width = 0;
        this.setState(statecopy);
    }

    render() {
        let tile_action;
        if (this.state.tiledata) {
            if (this.state.tiledata.type === "Field") {
                tile_action = <Field x={this.props.tilex} y={this.props.tiley} ref={this.action} width={field_width} height={field_length} seed={this.state.tiledata.seed}
                    planted={this.state.tiledata.planted} plown={this.state.tiledata.plown} queued={this.state.tiledata.queued}
                    fieldClick={() => this.props.fieldClick(this)} setGridData={(x, y, data) => this.props.setGridData(x, y, data)}
                    addCoins={(amount) => this.props.addCoins(amount)} addExp={(amount) => this.props.addExp(amount)} />;
            }
            else if (this.state.tiledata.type === "Tree") {
                tile_action = <TreeEntity x={this.props.tilex} y={this.props.tiley} ref={this.action} width={tree_width} height={tree_length} tree={this.state.tiledata.tree}
                    lastHarvested={this.state.tiledata.lastHarvested} queued={this.state.tiledata.queued}
                    treeClick={() => this.props.treeClick(this)} setGridData={(x, y, data) => this.props.setGridData(x, y, data)}
                    addCoins={(amount) => this.props.addCoins(amount)} />
            }
            else if (this.state.tiledata.type === "Animal") {
                tile_action = <AnimalEntity x={this.props.tilex} y={this.props.tiley} ref={this.action} width={tree_width} height={tree_length} animal={this.state.tiledata.animal}
                    lastHarvested={this.state.tiledata.lastHarvested} queued={this.state.tiledata.queued}
                    animalClick={() => this.props.animalClick(this)} setGridData={(x, y, data) => this.props.setGridData(x, y, data)}
                    addCoins={(amount) => this.props.addCoins(amount)} />
            }
        }
        let blueprint;
        if (this.state.placement_blueprint_height > 0 && this.state.placement_blueprint_width > 0) {
            blueprint = <Blueprint width={this.state.placement_blueprint_width} height={this.state.placement_blueprint_height} valid={this.state.placement_valid} />
        }
        // let character;
        // if (this.state.hasCharacter) {
        //     character = <Character tileOffsetX={this.state.characterPosX} tileOffsetY={this.state.characterPosY} />
        // }
        const styles = { 
            transform: `translate(${this.props.tiley*tile_length - this.props.tilex*(tile_width * 1.6)}px, ${-this.props.tiley*(tile_width * 0.5) + this.props.tilex*(tile_length/2)}px)`,
            position: 'relative',
            margin: 0,
            // backgroundColor: 'red',
            // opacity: 0.5,
        };
        return (
            <div class="GrassTile" style={styles}>
                {/* {character} */}
                {tile_action}
                {blueprint}
                <img class="GrassImg" style={{zIndex:1, position:'relative'}} src={grass} onMouseEnter={() => this.props.onMouseEnter(this)} onMouseLeave={() => this.onMouseLeave()} onClick={() => this.props.onClick(this)} alt=""/>
            </div>
        )
    }
}
