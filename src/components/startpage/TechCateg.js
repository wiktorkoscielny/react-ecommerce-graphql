import React, { Component } from 'react'

export default class TechCateg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            techCateg: []
        }
    }
    componentDidMount() {
        const categ = this.props.techCateg
        this.setState({
            techCateg: categ
        })
    }
    render() {
        return (
            <>
                <ul>
                    {this.props.techCateg.map((item, index) => {
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