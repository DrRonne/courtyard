import React from 'react'
import TileEntity from './TileEntity';

export default class Field extends TileEntity {
    constructor(props) {
        super(props);
        this.state = {
            seed: this.props.seed,
            planted: this.props.planted,
        }
    }

    render() {
        const styles = { 
            zIndex: 2,
            position: 'absolute',
            width:  this.renderWidth,
            height: this.renderHeight,
            transform: `translate(${this.horizontalDisplacement}px, ${this.verticalDisplacement}px)`,
        };
        const imgPath = "/assets/seeds/" + this.state.seed + "/" + this.state.seed + "_3.png"
        // import("./assets/seeds/" + this.state.seed + "/" + this.state.seed + "_3.png").then(image => img = image.default);
        return (
            <img class="FieldImg" style={styles} src={imgPath} alt=""/>
        )
    }
}
