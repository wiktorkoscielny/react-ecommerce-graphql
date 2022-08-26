import React, { Component } from 'react'

export default class AllCateg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCateg: []
        }
    }
    componentDidMount() {
        const categ = this.props.allCateg
        this.setState({
            allCateg: categ
        })
    }
    render() {
        return (
            <>
                <ul>
                    {this.props.allCateg.map((item, index) => {
                        return (
                            <li key={index}>
                                {item[0].brand}
                                <img src={item[0].gallery} />
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}