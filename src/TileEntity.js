import React, { Component } from 'react'
import { tile_length, tile_width } from './Constants';

export default class TileEntity extends Component {
    constructor(props) {
        super(props);
        this.width = this.props.width;
        const d = this.width - 1;
        const displacement = Math.pow(2, 1-d)*(Math.pow(2, d) + 2);
        this.renderWidth = this.width * tile_width;
        this.renderHeight = this.props.imgheight / this.props.imgwidth * this.renderWidth;
        this.horizontalDisplacement = -this.renderWidth / displacement;
        this.verticalDisplacement = -this.renderHeight + tile_length;
        this.state = {
            renderWidth: 0,
            renderHeight: 0,
            horizontalDisplacement: -this.renderWidth / displacement,
            verticalDisplacement: -this.renderHeight + tile_length,
        }
    }

    calcRenderHeight(w, h, widthovershoot=1) {
        return w / h * (this.width * widthovershoot * tile_width);
    }

    calcRenderWidth(fieldWidth, widthovershoot=1) {
        return fieldWidth * tile_width * widthovershoot;
    }

    calcHorizontalDisplacement(fieldWidth, renderWidth) {
        const d = fieldWidth - 1;
        const displacement = Math.pow(2, 1-d)*(Math.pow(2, d) + 2);
        return -renderWidth / displacement;
    }

    calcVerticalDisplacement(renderHeight) {
        return -renderHeight + tile_length;
    }

    render() {
        return (
            <div>
                Error displaying TileEntity!
            </div>
        )
    }
}
