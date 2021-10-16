import React, { Component } from 'react'

export default class Tool extends Component {
    constructor(props) {
        super(props);
        this.styles = { 
            width: 35,
            height: 45,
            zIndex: 1,
        };
        this.img_styles = {
            width: 35,
            height: 45,
            top: 0,
            left: 0,
            position: 'absolute',
            zIndex: 2,
        };
        this.div_styles = {
            position: 'relative',
        }
    }
    render() {
        return (
            <div>
                Shouldn't render this!!
            </div>
        )
    }
}
