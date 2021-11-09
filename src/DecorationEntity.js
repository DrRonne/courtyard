import React, { Fragment } from 'react'
import { ReactSession } from 'react-client-session';
import { server_ip, server_port, tile_length, tile_width } from './Constants';
import TileEntity from './TileEntity';

export default class DecorationEntity extends TileEntity {
    constructor(props) {
        super(props);
        this.imgElement = React.createRef();
        this.imgPath = "/assets/decorations/" + this.props.decoration + "/" + this.props.decoration + "_icon.png"
        this.state = {
            ...this.state,
            decoration: this.props.decoration,
            decoration_data: null,
            width: 1,
            length: 1,
            queued: this.props.queued,
            actionstate: null,
            actionprogress: 0,
        };
        // THIS IS DATA THAT SHOULD BE RETRIEVED FROM SOME API
        fetch(`/assets/decorations/${this.props.decoration}/${this.props.decoration}_properties.json`)
            .then((r) => r.json())
            .then((data) =>{
                const statecopy = {...this.state};
                statecopy.decoration_data = data;
                statecopy.width = data.width;
                this.width = data.width;
                statecopy.length = data.length;
                if (this.imgElement.current) {
                    statecopy.renderHeight = this.calcRenderHeight(this.imgElement.current.naturalHeight, this.imgElement.current.naturalWidth);
                    statecopy.renderWidth = this.calcRenderWidth(statecopy.width);
                    statecopy.horizontalDisplacement = this.calcHorizontalDisplacement(statecopy.width, statecopy.renderWidth);
                    statecopy.verticalDisplacement = this.calcVerticalDisplacement(statecopy.renderHeight) - tile_length/2;
                    console.log(this.state.decoration, statecopy.width, statecopy.renderWidth);
                }
                this.setState(statecopy);
            });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async place() {
        const planttime = 1000; // ms
        const steptime = 10; // ms
        const stepsize = 100 / (planttime / steptime);
        for (var i = 0; i < 100; i += stepsize) {
            const copystate = {...this.state};
            copystate.actionstate = "Placing decoration";
            copystate.actionprogress = i;
            this.setState(copystate);
            await this.sleep(steptime);
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authentication': `${ReactSession.get("token") }`},
            body: JSON.stringify({ x: this.props.x, y: this.props.y, decoration: this.props.decoration })
          };
          fetch(`http://${server_ip}:${server_port}/PlaceDecoration`, requestOptions)
                .then((r) => {
                    if (r.ok)
                    { return r.json(); }
                    else
                        {
                            window.location.reload();
                        }
                    })
                .then((respdata) =>{
                    const copystate = {...this.state};
                    copystate.lastHarvested = respdata.lastHarvested;
                    copystate.actionstate = null;
                    copystate.actionprogress = 0;
                    const data2 = this.state.decoration_data;
                    const griddata = {
                        type: "Decoration",
                        decoration: this.state.decoration,
                        lastHarvested: respdata.lastHarvested,
                        queued: false,
                    };
                    this.props.setGridData(this.props.x, this.props.y, griddata);
                    copystate.decoration_data = data2;
                    this.setState(copystate);
                });
    }

    setQueued(queued) {
        const copystate = {...this.state};
        copystate.queued = queued;
        this.setState(copystate);
    }

    render() {
        const styles = { 
            zIndex: 2,
            position: 'absolute',
            width:  this.state.renderWidth,
            height: this.state.renderHeight,
            transform: `translate(${this.state.horizontalDisplacement}px, ${this.state.verticalDisplacement}px)`,
            pointerEvents: 'none',
        };
        if (this.state.queued || this.state.actionstate) {
            styles.opacity = 0.5;
        }
        let actiondiv;
        if (this.state.actionstate) {
            const action_div_styles = {
                position: 'absolute',
                height: 20,
                width: 150,
                transform: 'translate(-50px, -54px)',
                zIndex: 3,
                pointerEvents: 'none',
            };
            const inner_div_styles = {
                position: 'relative',
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
            }
            const action_bg_styles = {
                width: '100%',
                height: '100%',
                backgroundColor: '#007f46',
                borderRadius: 10,
                border: '3px solid #000',
                zIndex: 1,
                pointerEvents: 'none',
            };
            const action_bar_styles = {
                position: 'absolute',
                left: 3,
                top: 3,
                backgroundColor: '#42f54e',
                borderRadius: 7,
                height: '100%',
                width: `${this.state.actionprogress}%`,
                zIndex: 2,
                pointerEvents: 'none',
            };
            const action_text_styles = {
                position: 'absolute',
                left: 5,
                top: 5,
                color: 'white',
                fontSize: 16,
                zIndex: 3,
                pointerEvents: 'none',
            }
            actiondiv = <div style={action_div_styles}>
                <div style={inner_div_styles}>
                    <div style={action_bg_styles} />
                    <div style={action_bar_styles} />
                    <div style={action_text_styles}><strong>{this.state.actionstate}: {this.state.actionprogress}%</strong></div>
                </div>
            </div>
        }
        const skewangle = Math.atan((tile_length / 2) / (tile_width / 2));
        const skewangle2 = Math.atan((tile_width / 2) / (tile_length / 2));
        const calcwidth = Math.sqrt(Math.pow(tile_width / 2, 2) + Math.pow(tile_length / 2, 2)) * Math.cos(skewangle);
        const calcheight = Math.sqrt(Math.pow(tile_width / 2, 2) + Math.pow(tile_length / 2, 2)) * Math.cos(skewangle2);
        const unbalance = this.state.width - this.state.length;
        var unbalance_vertical_move  = - tile_length * unbalance / 4;
        // console.log(this.props.width, this.props.height)
        const interact_div_styles = {
            position: 'absolute',
            zIndex: 4,
            width: calcwidth,
            height: calcheight,
            backgroundColor: 'green',
            opacity: 0,
            transform: `translate(${calcwidth/2 + unbalance*calcwidth/2}px, ${-calcheight/2 - tile_length * (this.state.length - 2) / 2 + unbalance_vertical_move}px) skew(-${skewangle2}rad, ${skewangle}rad) scale(${this.state.length}, ${this.state.width})`,
        };
        return (
            <Fragment>
                <div style={interact_div_styles} onClick={() => this.props.decorationClick()} />
                <img ref={this.imgElement} class="DecorationImg" style={styles} src={this.imgPath} alt=""
                    onLoad={() => {
                        this.width = this.state.width;
                        const d = this.width - 1;
                        const displacement = Math.pow(2, 1-d)*(Math.pow(2, d) + 2);
                        this.renderWidth = this.width * tile_width;
                        this.renderHeight = this.props.imgheight / this.props.imgwidth * this.renderWidth;
                        this.horizontalDisplacement = -this.renderWidth / displacement;
                        this.verticalDisplacement = -this.renderHeight + tile_length;
                        const copystate = {...this.state};
                        copystate.renderHeight = this.calcRenderHeight(this.imgElement.current.naturalHeight, this.imgElement.current.naturalWidth);
                        copystate.renderWidth = this.calcRenderWidth(this.state.width);
                        copystate.horizontalDisplacement = this.calcHorizontalDisplacement(this.state.width, copystate.renderWidth);
                        copystate.verticalDisplacement = this.calcVerticalDisplacement(copystate.renderHeight) - tile_length/2;
                        this.setState(copystate);
                    }}
                />
                {actiondiv}
            </Fragment>
        )
    }
}
