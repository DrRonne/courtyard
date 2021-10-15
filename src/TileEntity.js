import React, { Component } from 'react'

export default class TileEntity extends Component {
    constructor(props) {
        super(props);
        const d = this.props.width - 1;
        const displacement = Math.pow(2, 1-d)*(Math.pow(2, d) + 2);
        this.renderWidth = this.props.width * 66;
        this.renderHeight = this.props.imgheight / this.props.imgwidth * this.renderWidth;
        this.horizontalDisplacement = -this.renderWidth / displacement;
        this.verticalDisplacement = -this.renderHeight + 34;
        this.state = {
            renderWidth: 0,
            renderHeight: 0,
            horizontalDisplacement: -this.renderWidth / displacement,
            verticalDisplacement: -this.renderHeight + 34,
        }
    }

    calcRenderHeight(w, h) {
        return w / h * (this.props.width * 66);
    }

    calcRenderWidth(fieldWidth) {
        return fieldWidth * 66;
    }

    calcHorizontalDisplacement(fieldWidth, renderWidth) {
        const d = fieldWidth - 1;
        const displacement = Math.pow(2, 1-d)*(Math.pow(2, d) + 2);
        return -renderWidth / displacement;
    }

    calcVerticalDisplacement(renderHeight) {
        return -renderHeight + 34;
    }

    render() {
        return (
            <div>
                Error displaying TileEntity!
            </div>
        )
    }
}
