import React, { Component } from 'react'

export default class ClothesCateg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clothesCateg: []
        }
    }
    componentDidMount() {
        const categ = this.props.clothesCateg
        this.setState({
            clothesCateg: categ
        })
    }
    render() {
        return (
            <>
                <ul>
                    {this.props.clothesCateg.map((item, index) => {
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