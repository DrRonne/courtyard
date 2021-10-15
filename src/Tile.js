import React, { Component } from 'react'
import grass from './assets/grass.png'
import Field from './Field.js'

export default class Tile extends Component {
    render() {
        let tile_action;
        if (this.props.tiledata)
        {
            tile_action = <Field width={2} height={2} seed={this.props.tiledata.seed} planted={this.props.tiledata.planted} />;
        }
        const styles = { 
            transform: `translate(${this.props.tiley*34 - this.props.tilex*103}px, ${-this.props.tiley*26 + this.props.tilex*17}px)`,
            position: 'relative',
        };
        return (
            <div class="GrassTile" style={styles}>
                {tile_action}
                <img class="GrassImg" style={{zIndex:1, position:'relative'}} src={grass} alt=""/>
            </div>
        )
    }
}
