import React, { Component } from 'react'

export default class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tileOffsetX: this.props.tileOffsetX,
            tileOffsetY: this.props.tileOffsetY,
        }
    }

    render() {
        const actualXOffset = -33 + this.props.tileOffsetX;
        const actualYOffset = -132 + 34 + this.props.tileOffsetY;
        const styles = {
            backgroundColor: 'orange',
            width: 66,
            height: 132,
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translate(${actualXOffset}px, ${actualYOffset}px)`,
            opacity: 1,
            zIndex: 3,
        }
        return (
            <div id="character" style={styles}>
                
            </div>
        )
    }
}
