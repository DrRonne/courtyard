import React, { Component } from 'react'
import background from '../../assets/market/shop_section_background.png'
import rightArrow from '../../assets/market/arrow_right.png'
import leftArrow from '../../assets/market/arrow_left.png'
import data from '../../resources/supported_tree_stats.json'
import Tree from './ShopItems/Tree';

export default class Trees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    }

    rightArrowClick() {
        if (this.state.page < data.length / 6 - 1) {
            const statecopy = {...this.state};
            statecopy.page += 1;
            this.setState(statecopy);
        }
    }

    leftArrowClick() {
        if (this.state.page > 0) {
            const statecopy = {...this.state};
            statecopy.page -= 1;
            this.setState(statecopy);
        }
    }

    render() {
        let tree1Elem;
        if (data.length > this.state.page*6) {
            const tree1 = data[this.state.page*6]
            tree1Elem = <Tree name={tree1.name} sell={tree1.sellprice} time={tree1.time} price={tree1.cost} treeBuyClick={(treeData) => this.props.treeBuyClick(treeData)} />
        }
        let tree2Elem;
        if (data.length > this.state.page*6 + 1) {
            const tree2 = data[this.state.page*6 + 1]
            tree2Elem = <Tree name={tree2.name} sell={tree2.sellprice} time={tree2.time} price={tree2.cost} treeBuyClick={(treeData) => this.props.treeBuyClick(treeData)} />
        }
        let tree3Elem;
        if (data.length > this.state.page*6 + 2) {
            const tree3 = data[this.state.page*6 + 2]
            tree3Elem = <Tree name={tree3.name} sell={tree3.sellprice} time={tree3.time} price={tree3.cost} treeBuyClick={(treeData) => this.props.treeBuyClick(treeData)} />
        }
        let tree4Elem;
        if (data.length > this.state.page*6 + 3) {
            const tree4 = data[this.state.page*6 + 3]
            tree4Elem = <Tree name={tree4.name} sell={tree4.sellprice} time={tree4.time} price={tree4.cost} treeBuyClick={(treeData) => this.props.treeBuyClick(treeData)} />
        }
        let tree5Elem;
        if (data.length > this.state.page*6 + 4) {
            const tree5 = data[this.state.page*6 + 4]
            tree5Elem = <Tree name={tree5.name} sell={tree5.sellprice} time={tree5.time} price={tree5.cost} treeBuyClick={(treeData) => this.props.treeBuyClick(treeData)} />
        }
        let tree6Elem;
        if (data.length > this.state.page*6 + 5) {
            const tree6 = data[this.state.page*6 + 5]
            tree6Elem = <Tree name={tree6.name} sell={tree6.sellprice} time={tree6.time} price={tree6.cost} treeBuyClick={(treeData) => this.props.treeBuyClick(treeData)} />
        }
        const div_styles = {
            position: 'absolute',
            top: 140,
            left: '50%',
            transform: 'translate(-50%, 0%)',
        };
        const bg_styles = {
            position: 'relative',
        };
        const left_styles = {
            position: 'absolute',
            top: '50%',
            left: -90,
            transform: 'translate(0%, -50%)',
        };
        const right_styles = {
            position: 'absolute',
            top: '50%',
            right: -90,
            transform: 'translate(0%, -50%)',
        };
        const table_styles = {
            position: 'absolute',
            left: '50%',
            top: 8,
            transform: 'translate(-50%, 0%)',
        };
        let leftArrowElem;
        if (this.state.page > 0 ) {
            leftArrowElem = <img src={leftArrow} style={left_styles} onClick={() => this.leftArrowClick()} alt="" />
        }
        let rightArrowElem;
        if (this.state.page < data.length / 6 - 1) {
            rightArrowElem = <img src={rightArrow} style={right_styles} onClick={() => this.rightArrowClick()} alt="" />
        }
        return (
            <div style={div_styles}>
                <img src={background} style={bg_styles} alt="" />
                {leftArrowElem}
                {rightArrowElem}
                <table style={table_styles}>
                    <tbody>
                        <tr>
                            <td>{tree1Elem}</td>
                            <td>{tree2Elem}</td>
                            <td>{tree3Elem}</td>
                        </tr>
                        <tr>
                            <td>{tree4Elem}</td>
                            <td>{tree5Elem}</td>
                            <td>{tree6Elem}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
