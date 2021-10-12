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
    }

    render() {
        return (
            <div>
                Error displaying TileEntity!
            </div>
        )
    }
}
