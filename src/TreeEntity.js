import React, { Fragment } from 'react'
import { ReactSession } from 'react-client-session';
import { server_ip, server_port, tile_length, tile_width, tree_length, tree_width } from './Constants';
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
                this.updateTreeImage(this.state.lastHarvested);
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
                    copystate.tree_data = data2;
                    const img = this.getTreeImage(respdata.lastHarvested);
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
          fetch(`http://${server_ip}:${server_port}/HarvestTree`, requestOptions)
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
                    this.props.addCoins(data2.harvestcoins);
                    copystate.tree_data = data2;
                    const img = this.getTreeImage(respdata.lastHarvested);
                    copystate.imgPath = img;
                    this.setState(copystate);
                });
    }

    setQueued(queued) {
        const copystate = {...this.state};
        copystate.queued = queued;
        this.setState(copystate);
    }

    getTreeImage(lastHarvested) {
        let newimg;
        if (lastHarvested + this.state.tree_data.time < (Date.now() / 1000)) {
            newimg = "/assets/trees/" + this.state.tree + "/" + this.state.tree + "2.png"
        }
        else {
            newimg = "/assets/trees/" + this.state.tree + "/" + this.state.tree + "1.png"
        }
        return newimg;
    }

    updateTreeImage(lastHarvested) {
        const newimg = this.getTreeImage(lastHarvested);
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
        const skewangle = Math.atan((tile_length * tree_length / 2) / (tile_width * tree_width / 2));
        const skewangle2 = Math.atan((tile_width * tree_width / 2) / (tile_length * tree_length / 2));
        const calcwidth = Math.sqrt(Math.pow(tile_width * tree_width / 2, 2) + Math.pow(tile_length * tree_length / 2, 2)) * Math.cos(skewangle);
        const calcheight = Math.sqrt(Math.pow(tile_width * tree_width / 2, 2) + Math.pow(tile_length * tree_length / 2, 2)) * Math.cos(skewangle2)
        const interact_div_styles = {
            position: 'absolute',
            width: calcwidth,
            height: calcheight,
            backgroundColor: 'green',
            transform: `skew(-${skewangle2}rad, ${skewangle}rad) translate(${this.state.horizontalDisplacement + calcwidth/2}px, ${-calcheight/2 + 5}px)`,
            opacity: 0.5,
            zIndex: 4,
        }
        return (
            <Fragment>
                <div style={interact_div_styles} onClick={() => this.props.treeClick()} />
                <img ref={this.imgElement} class="TreeImg" style={styles} src={this.state.imgPath} alt=""
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
