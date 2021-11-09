import React, { Fragment } from 'react'
import { ReactSession } from 'react-client-session';
import { server_ip, server_port, plow_cost, plow_exp, wither_factor, tile_length, tile_width, field_length, field_width } from './Constants';
import TileEntity from './TileEntity';
import loading_bar from './assets/world/loading_bar_bg.png'

export default class Field extends TileEntity {
    constructor(props) {
        super(props);
        this.imgElement = React.createRef();
        this.state = {
            ...this.state,
            imgPath: this.props.plown ? "/assets/plown_plot.png" : "/assets/fallow_plot.png",
            seed: this.props.seed,
            planted: this.props.planted,
            seed_data: null,
            plown: this.props.plown,
            queued: this.props.queued,
            actionstate: null,
            actionprogress: 0,
        };
        // THIS IS DATA THAT SHOULD BE RETRIEVED FROM SOME API
        if (this.state.seed) {
            fetch(`/assets/seeds/${this.props.seed}/${this.props.seed}_properties.json`)
                .then((r) => r.json())
                .then((data) =>{
                    this.state.seed_data = data;
                    this.updateSeedImage();
                });
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async plow() {
        const plowtime = 1000; // ms
        const steptime = 10; // ms
        const stepsize = 100 / (plowtime / steptime);
        for (var i = 0; i < 100; i += stepsize) {
            const copystate = {...this.state};
            copystate.actionstate = "Plowing";
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
          fetch(`http://${server_ip}:${server_port}/PlowField`, requestOptions)
                .then((r) => {
                    if (r.ok)
                    { return r.json(); }
                    else
                        {
                            window.location.reload();
                        }
                    })
                .then((data) =>{
                    const griddata = {
                        type: "Field",
                        seed: null,
                        planted: null,
                        fertilized: false,
                        plown: true,
                        queued: false,
                    };
                    this.props.setGridData(this.props.x, this.props.y, griddata);
                    this.props.addCoins(-plow_cost);
                    this.props.addExp(plow_exp);
                    const copystate = {...this.state};
                    copystate.plown = true;
                    copystate.actionstate = null;
                    copystate.actionprogress = 0;
                    copystate.imgPath = this.getFieldImage(null, true, null, null);
                    this.setState(copystate);
                });
    }

    async plant(data) {
        const planttime = 1000; // ms
        const steptime = 10; // ms
        const stepsize = 100 / (planttime / steptime);
        for (var i = 0; i < 100; i += stepsize) {
            const copystate = {...this.state};
            copystate.actionstate = "Planting seed";
            copystate.actionprogress = i;
            this.setState(copystate);
            await this.sleep(steptime);
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authentication': `${ReactSession.get("token") }`},
            body: JSON.stringify({ x: this.props.x, y: this.props.y, seed: data })
          };
          fetch(`http://${server_ip}:${server_port}/PlantSeed`, requestOptions)
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
                    copystate.seed = data;
                    copystate.planted = respdata.planted;
                    copystate.actionstate = null;
                    copystate.actionprogress = 0;
                    fetch(`/assets/seeds/${data}/${data}_properties.json`)
                            .then((r) => r.json())
                            .then((data2) =>{
                                const griddata = {
                                    type: "Field",
                                    seed: data,
                                    planted: respdata.planted,
                                    fertilized: false,
                                    plown: true,
                                    queued: false,
                                };
                                this.props.setGridData(this.props.x, this.props.y, griddata);
                                this.props.addCoins(-data2.cost);
                                this.props.addExp(data2.experience);
                                copystate.seed_data = data2;
                                const img = this.getFieldImage(data, true, copystate.planted, data2.time);
                                copystate.imgPath = img;
                                this.setState(copystate);
                            });
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
          fetch(`http://${server_ip}:${server_port}/HarvestField`, requestOptions)
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
                    copystate.seed = null;
                    copystate.planted = null;
                    copystate.actionstate = null;
                    copystate.actionprogress = 0;
                    const data2 = this.state.seed_data;
                    const griddata = {
                        type: "Field",
                        seed: null,
                        planted: null,
                        fertilized: false,
                        plown: false,
                        queued: false,
                    };
                    this.props.setGridData(this.props.x, this.props.y, griddata);
                    if (!respdata["withered"]) {
                        this.props.addCoins(data2.sellprice);
                    }
                    copystate.seed_data = data2;
                    const img = this.getFieldImage(null, false, null, null);
                    copystate.imgPath = img;
                    this.setState(copystate);
                });
    }

    setQueued(queued) {
        const copystate = {...this.state};
        copystate.queued = queued;
        this.setState(copystate);
    }

    getFieldImage(seed, plown, planted, time) {
        let newimg;
        if (seed) {
            const time_planted = (Date.now() / 1000) - planted;
            const percentage = time_planted / time;
            if (percentage > wither_factor) {
                newimg = "/assets/seeds/" + seed + "/" + seed + "_withered.png";
            }
            else if (percentage > 1) {
                newimg = "/assets/seeds/" + seed + "/" + seed + "_3.png";
            }
            else if (percentage > 0.66) {
                newimg = "/assets/seeds/" + seed + "/" + seed + "_2.png";
            }
            else if (percentage > 0.33) {
                newimg = "/assets/seeds/" + seed + "/" + seed + "_1.png";
            }
            else {
                newimg = "/assets/seeds/" + seed + "/" + seed + "_0.png";
            }
        }
        else {
            if (plown) {
                newimg = "/assets/plown_plot.png";
            }
            else {
                newimg = "/assets/fallow_plot.png";
            }
        }
        return newimg;
    }

    updateSeedImage() {
        const newimg = this.getFieldImage(this.state.seed, this.state.plow, this.state.planted, this.state.seed_data.time);
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
        const unbalance = field_width - field_length;
        var unbalance_vertical_move  = - tile_length * unbalance / 4;
        const interact_div_styles = {
            position: 'absolute',
            zIndex: 4,
            width: calcwidth,
            height: calcheight,
            backgroundColor: 'green',
            opacity: 0,
            transform: `translate(${calcwidth/2 + unbalance*calcwidth/2}px, ${-calcheight/2 - tile_length * (field_length - 2) / 2 + unbalance_vertical_move}px) skew(-${skewangle2}rad, ${skewangle}rad) scale(${field_length}, ${field_width})`,
        };
        return (
            <Fragment>
                <div style={interact_div_styles} onClick={() => this.props.fieldClick()} />
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
                {actiondiv}
            </Fragment>
        )
    }
}
