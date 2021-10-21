import React, { Component } from 'react'
import grass from './assets/grass.png'
import Blueprint from './Blueprint.js'
import Field from './Field.js'
import Character from './Character.js'

export default class Tile extends Component {
    constructor(props) {
        super(props);
        this.action = null;
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
            tile_action = <Field width={2} height={2} seed={this.state.tiledata.seed} planted={this.state.tiledata.planted} plown={this.state.tiledata.plown} queued={this.state.tiledata.queued} />;
        }
        this.action = tile_action;
        let blueprint;
        if (this.state.placement_blueprint_height > 0 && this.state.placement_blueprint_width > 0) {
            blueprint = <Blueprint width={this.state.placement_blueprint_width} height={this.state.placement_blueprint_height} valid={this.state.placement_valid} />
        }
        let character;
        if (this.state.hasCharacter) {
            character = <Character tileOffsetX={this.state.characterPosX} tileOffsetY={this.state.characterPosY} />
        }
        const styles = { 
            transform: `translate(${this.props.tiley*34 - this.props.tilex*103}px, ${-this.props.tiley*26 + this.props.tilex*17}px)`,
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
