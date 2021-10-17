import React from 'react'
import TileEntity from './TileEntity';
import green_placement from './assets/world/place_item_green.png'
import red_placement from './assets/world/place_item_red.png'

export default class Blueprint extends TileEntity {
    constructor(props) {
        super(props);
        this.imgElement = React.createRef();      
    }

    render() {
        let imgPath;
        if (this.props.valid) {
            imgPath = green_placement
        }
        else {
            imgPath = red_placement;
        }
        const styles = { 
            zIndex: 2,
            position: 'absolute',
            width:  this.state.renderWidth,
            height: this.state.renderHeight,
            transform: `translate(${this.state.horizontalDisplacement}px, ${this.state.verticalDisplacement}px)`,
            pointerEvents: 'none',
        };
        return (
            <img ref={this.imgElement} class="FieldImg" style={styles} src={imgPath} alt=""
                onLoad={() => {
                    // Correctly scale and transform the image so it fits in the field
                    const copystate = {...this.state};
                    copystate.renderHeight = this.calcRenderHeight(this.imgElement.current.naturalHeight, this.imgElement.current.naturalWidth);
                    copystate.renderWidth = this.calcRenderWidth(this.props.width);
                    copystate.horizontalDisplacement = this.calcHorizontalDisplacement(this.props.width, copystate.renderWidth);
                    copystate.verticalDisplacement = this.calcVerticalDisplacement(copystate.renderHeight);
                    this.setState(copystate);
                }}
            />
        )
    }
}
