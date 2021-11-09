import React, { Fragment } from 'react'
import { ReactSession } from 'react-client-session';
import { server_ip, server_port, tile_length, tile_width } from './Constants';
import TileEntity from './TileEntity';
import loading_bar from './assets/world/loading_bar_bg.png'

export default class AnimalEntity extends TileEntity {
    constructor(props) {
        super(props);
        this.imgElement = React.createRef();
        this.imgPath = "/assets/animals/" + this.props.animal + "/" + this.props.animal + "_icon.png"
        this.state = {
            ...this.state,
            animal: this.props.animal,
            lastHarvested: this.props.lastHarvested,
            animal_data: null,
            queued: this.props.queued,
            actionstate: null,
            actionprogress: 0,
        };
        // THIS IS DATA THAT SHOULD BE RETRIEVED FROM SOME API
        fetch(`/assets/animals/${this.props.animal}/${this.props.animal}_properties.json`)
            .then((r) => r.json())
            .then((data) =>{
                this.state.animal_data = data;
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
            copystate.actionstate = "Placing animal";
            copystate.actionprogress = i;
            this.setState(copystate);
            await this.sleep(steptime);
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authentication': `${ReactSession.get("token") }`},
            body: JSON.stringify({ x: this.props.x, y: this.props.y, animal: this.props.animal })
          };
          fetch(`http://${server_ip}:${server_port}/PlaceAnimal`, requestOptions)
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
                    const data2 = this.state.animal_data;
                    const griddata = {
                        type: "Animal",
                        animal: this.state.animal,
                        lastHarvested: respdata.lastHarvested,
                        queued: false,
                    };
                    this.props.setGridData(this.props.x, this.props.y, griddata);
                    copystate.animal_data = data2;
                    this.setState(copystate);
                });
    }

    async harvest() {
        const harvesttime = 1000; // ms
        const steptime = 10; // ms
        const stepsize = 100 / (harvesttime / steptime);
        for (var i = 0; i < 100; i += stepsize) {
            const copystate = {...this.state};
            copystate.actionstate = "Harvesting";
            copystate.actionprogress = i;
            this.setState(copystate);
            await this.sleep(steptime);
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authentication': `${ReactSession.get("token") }`},
            body: JSON.stringify({ x: this.props.x, y: this.props.y })
          };
          fetch(`http://${server_ip}:${server_port}/HarvestAnimal`, requestOptions)
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
                    const data2 = this.state.animal_data;
                    const griddata = {
                        type: "Animal",
                        animal: this.state.animal,
                        lastHarvested: respdata.lastHarvested,
                        queued: false,
                    };
                    this.props.setGridData(this.props.x, this.props.y, griddata);
                    this.props.addCoins(data2.harvestcoins);
                    copystate.animal_data = data2;
                    this.setState(copystate);
                });
    }

    setQueued(queued) {
        const copystate = {...this.state};
        copystate.queued = queued;
        this.setState(copystate);
    }

    render() {
        console.log(this.props.width, this.props.height);
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
            }
            const action_bg_styles = {
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
            };
            const action_bar_styles = {
                position: 'absolute',
                left: 1,
                top: 1,
                backgroundColor: '#42f54e',
                height: 'calc(100% - 4px)',
                width: `calc(${this.state.actionprogress}% - 4px)`,
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
                    <img src={loading_bar} alt="" style={action_bg_styles}></img>
                    <div style={action_bar_styles} />
                    <div style={action_text_styles}><strong>{this.state.actionstate}: {this.state.actionprogress}%</strong></div>
                </div>
            </div>
        }
        const skewangle = Math.atan((tile_length / 2) / (tile_width / 2));
        const skewangle2 = Math.atan((tile_width / 2) / (tile_length / 2));
        const calcwidth = Math.sqrt(Math.pow(tile_width / 2, 2) + Math.pow(tile_length / 2, 2)) * Math.cos(skewangle);
        const calcheight = Math.sqrt(Math.pow(tile_width / 2, 2) + Math.pow(tile_length / 2, 2)) * Math.cos(skewangle2);
        const unbalance = this.props.width - this.props.height;
        var unbalance_vertical_move  = - tile_length * unbalance / 4;
        const interact_div_styles = {
            position: 'absolute',
            zIndex: 4,
            width: calcwidth,
            height: calcheight,
            backgroundColor: 'green',
            opacity: 0,
            transform: `translate(${calcwidth/2 + unbalance*calcwidth/2}px, ${-calcheight/2 - tile_length * (this.props.height - 2) / 2 + unbalance_vertical_move}px) skew(-${skewangle2}rad, ${skewangle}rad) scale(${this.props.height}, ${this.props.width})`,
        };
        return (
            <Fragment>
                <div style={interact_div_styles} onClick={() => this.props.animalClick()} />
                <img ref={this.imgElement} class="AnimalImg" style={styles} src={this.imgPath} alt=""
                    onLoad={() => {
                        const copystate = {...this.state};
                        copystate.renderHeight = this.calcRenderHeight(this.imgElement.current.naturalHeight, this.imgElement.current.naturalWidth);
                        copystate.renderWidth = this.calcRenderWidth(this.props.width);
                        copystate.horizontalDisplacement = this.calcHorizontalDisplacement(this.props.width, copystate.renderWidth);
                        copystate.verticalDisplacement = this.calcVerticalDisplacement(copystate.renderHeight) - tile_length/2;
                        this.setState(copystate);
                    }}
                />
                {actiondiv}
            </Fragment>
        )
    }
}
