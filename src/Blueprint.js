import React from 'react'
import TileEntity from './TileEntity';
import { tile_length, tile_width } from './Constants';

export default class Blueprint extends TileEntity {

    render() {
        const borderthickness = 1;
        const skewangle = Math.atan((tile_length / 2) / (tile_width / 2));
        const skewangle2 = Math.atan((tile_width / 2) / (tile_length / 2));
        const calcwidth = Math.sqrt(Math.pow(tile_width / 2, 2) + Math.pow(tile_length / 2, 2)) * Math.cos(skewangle);
        const calcheight = Math.sqrt(Math.pow(tile_width / 2, 2) + Math.pow(tile_length / 2, 2)) * Math.cos(skewangle2);
        const bp_div_styles = {
            position: 'absolute',
            zIndex: 4,
            width: calcwidth - borderthickness * 4,
            height: calcheight - borderthickness * 3,
            backgroundColor: 'green',
            opacity: 0.5,
            border: `${borderthickness}px solid #FFFF00`,
            transform: `translate(${calcwidth/2}px, ${-this.props.height * tile_length / 2 + tile_length}px) skew(-${skewangle2}rad, ${skewangle}rad) scale(${this.props.width}, ${this.props.height})`,
            pointerEvents: 'none',
        };
        if (this.props.valid) {
            bp_div_styles.backgroundColor = '#17fc03';
            bp_div_styles.border = `${borderthickness}px solid #03b300`
        }
        else {
            bp_div_styles.backgroundColor = '#ff0000';
            bp_div_styles.border = `${borderthickness}px solid #b80000`
        }
        return (
            <div style={bp_div_styles} />
        )
    }
}
