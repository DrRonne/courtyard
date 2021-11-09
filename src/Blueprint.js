import React from 'react'
import TileEntity from './TileEntity';
import { tile_length, tile_width } from './Constants';

export default class Blueprint extends TileEntity {

    render() {
        const skewangle = Math.atan((tile_length / 2) / (tile_width / 2));
        const skewangle2 = Math.atan((tile_width / 2) / (tile_length / 2));
        const calcwidth = Math.sqrt(Math.pow(tile_width / 2, 2) + Math.pow(tile_length / 2, 2)) * Math.cos(skewangle);
        const calcheight = Math.sqrt(Math.pow(tile_width / 2, 2) + Math.pow(tile_length / 2, 2)) * Math.cos(skewangle2);
        const unbalance = this.props.width - this.props.height;
        var unbalance_vertical_move  = - tile_length * unbalance / 4;
        const bp_div_styles = {
            position: 'absolute',
            zIndex: 4,
            width: calcwidth,
            height: calcheight,
            backgroundColor: 'green',
            opacity: 0.5,
            transform: `translate(${calcwidth/2 + unbalance*calcwidth/2}px, ${-calcheight/2 - tile_length * (this.props.height - 2) / 2 + unbalance_vertical_move}px) skew(-${skewangle2}rad, ${skewangle}rad) scale(${this.props.height}, ${this.props.width})`,
            pointerEvents: 'none',
        };
        if (this.props.valid) {
            bp_div_styles.backgroundColor = '#17fc03';
        }
        else {
            bp_div_styles.backgroundColor = '#ff0000';
        }
        return (
            <div style={bp_div_styles} />
        )
    }
}
