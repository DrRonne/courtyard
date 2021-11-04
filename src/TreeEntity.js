import React, { Fragment } from 'react'
import { ReactSession } from 'react-client-session';
import { server_ip, server_port, tile_length } from './Constants';
import TileEntity from './TileEntity';
import loading_bar from './assets/world/loading_bar_bg.png'

export default class TreeEntity extends TileEntity {
    constructor(props) {
        super(props);
        this.imgElement = React.createRef();
        this.state = {
            ...this.state,
            imgPath: null,
            tree: this.props.tree,
            lastHarvested: this.props.lastHarvested,
            tree_data: null,
            queued: this.props.queued,
            actionstate: null,
            actionprogress: 0,
        };
        // THIS IS DATA THAT SHOULD BE RETRIEVED FROM SOME API
        fetch(`/assets/trees/${this.props.tree}/${this.props.tree}_properties.json`)
            .then((r) => r.json())
            .then((data) =>{
                this.state.tree_data = data;
                this.updateTreeImage();
            });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async plant() {
        const planttime = 1000; // ms
        const steptime = 10; // ms
        const stepsize = 100 / (planttime / steptime);
        for (var i = 0; i < 100; i += stepsize) {
            const copystate = {...this.state};
            copystate.actionstate = "Planting tree";
            copystate.actionprogress = i;
            this.setState(copystate);
            await this.sleep(steptime);
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authentication': `${ReactSession.get("token") }`},
            body: JSON.stringify({ x: this.props.x, y: this.props.y, tree: this.props.tree })
          };
          fetch(`http://${server_ip}:${server_port}/PlantTree`, requestOptions)
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
                    const data2 = this.state.tree_data;
                    const griddata = {
                        type: "Tree",
                        tree: this.state.tree,
                        lastHarvested: respdata.lastHarvested,
                        queued: false,
                    };
                    this.props.setGridData(this.props.x, this.props.y, griddata);
                    copystate.seed_data = data2;
                    const img = this.getTreeImage();
                    copystate.imgPath = img;
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

    getTreeImage() {
        let newimg;
        if (this.state.lastHarvested + this.state.tree_data.time < (Date.now() / 1000)) {
            newimg = "/assets/trees/" + this.state.tree + "/" + this.state.tree + "2.png"
        }
        else {
            newimg = "/assets/trees/" + this.state.tree + "/" + this.state.tree + "1.png"
        }
        return newimg;
    }

    updateTreeImage() {
        const newimg = this.getTreeImage();
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
        return (
            <Fragment>
                <img ref={this.imgElement} class="TreeImg" style={styles} src={this.state.imgPath} alt=""
                    onClick={() => this.props.treeClick()}
                    onLoad={() => {
                        const copystate = {...this.state};
                        copystate.renderHeight = this.calcRenderHeight(this.imgElement.current.naturalHeight, this.imgElement.current.naturalWidth, 1.5);
                        copystate.renderWidth = this.calcRenderWidth(this.props.width, 1.5);
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
