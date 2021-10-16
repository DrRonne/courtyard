import React from 'react'
import TileEntity from './TileEntity';

export default class Field extends TileEntity {
    constructor(props) {
        super(props);
        this.imgElement = React.createRef();
        this.state = {
            ...this.state,
            imgPath: null,
            seed: this.props.seed,
            planted: this.props.planted,
            seed_data: null,
        };
        // THIS IS DATA THAT SHOULD BE RETRIEVED FROM SOME API
        fetch(`/assets/seeds/${this.props.seed}/${this.props.seed}_properties.json`)
            .then((r) => r.json())
            .then((data) =>{
                this.state.seed_data = data;
                this.updateSeedImage();
            });        
    }

    updateSeedImage() {
        const time_planted = (Date.now() / 1000) - this.state.planted;
        const percentage = time_planted / this.state.seed_data.time;
        let newimg;
        if (percentage > 1.2) {
            newimg = "/assets/seeds/" + this.state.seed + "/" + this.state.seed + "_withered.png";
        }
        else if (percentage > 1) {
            newimg = "/assets/seeds/" + this.state.seed + "/" + this.state.seed + "_3.png";
        }
        else if (percentage > 0.66) {
            newimg = "/assets/seeds/" + this.state.seed + "/" + this.state.seed + "_2.png";
        }
        else if (percentage > 0.33) {
            newimg = "/assets/seeds/" + this.state.seed + "/" + this.state.seed + "_1.png";
        }
        else {
            newimg = "/assets/seeds/" + this.state.seed + "/" + this.state.seed + "_0.png";
        }
        const copystate = {...this.state};
        copystate.imgPath = newimg;
        this.setState(copystate);
    }

    render() {
        const styles = { 
            zIndex: 2,
            position: 'absolute',
            width:  this.state.renderWidth,
            height: this.state.renderHeight,
            transform: `translate(${this.state.horizontalDisplacement}px, ${this.state.verticalDisplacement}px)`,
        };
        return (
            <img ref={this.imgElement} class="FieldImg" style={styles} src={this.state.imgPath} alt=""
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
