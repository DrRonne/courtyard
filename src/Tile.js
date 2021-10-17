import React, { Component } from 'react'
import grass from './assets/grass.png'
import Blueprint from './Blueprint.js'
import Field from './Field.js'

export default class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tiledata: this.props.tiledata,
            placement_blueprint_width: 0,
            placement_blueprint_height: 0,
            placement_valid: false,
        }
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
            tile_action = <Field width={2} height={2} seed={this.state.tiledata.seed} planted={this.state.tiledata.planted} plown={this.state.tiledata.plown} />;
        }
        let blueprint;
        if (this.state.placement_blueprint_height > 0 && this.state.placement_blueprint_width > 0) {
            blueprint = <Blueprint width={this.state.placement_blueprint_width} height={this.state.placement_blueprint_height} valid={this.state.placement_valid} />
        }
        const styles = { 
            transform: `translate(${this.props.tiley*34 - this.props.tilex*103}px, ${-this.props.tiley*26 + this.props.tilex*17}px)`,
            position: 'relative',
        };
        return (
            <div class="GrassTile" style={styles}>
                {tile_action}
                {blueprint}
                <img class="GrassImg" style={{zIndex:1, position:'relative'}} src={grass} onMouseEnter={() => this.props.onMouseEnter(this)} onMouseLeave={() => this.onMouseLeave()} onClick={() => this.props.onClick(this)} alt=""/>
            </div>
        )
    }
}
