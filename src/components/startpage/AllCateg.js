import React, { Component } from 'react'

// styles
import { ListWrapper, ListItem, ImgWrapper } from './Styles';

export default class AllCateg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCateg: [],
            productClicked: ''
        }
    }
    componentDidMount() {
        const categ = this.props.allCateg
        this.setState({
            ...this.state,
            allCateg: categ,
        })
    }
    currencySwitcher = (param) => {
        switch (this.props.currencyData) {
            case '$':
                return <>{param.prices[0].amount}</>
            case '£':
                return <>{param.prices[1].amount}</>
            case 'A$':
                return <>{param.prices[2].amount}</>
            case '¥':
                return <>{param.prices[3].amount}</>
            case '₽':
                return <>{param.prices[4].amount}</>
        }
    }
    render() {
        return (
            <>
                <ListWrapper>
                    {this.props.allCateg.map((item, index) => {
                        return (
                            <ListItem key={index} onClick={() => this.props.productIdCallback(item[0].id)}>
                                <ImgWrapper src={item[0].gallery} style={{ width: '100%', height: '80%' }}></ImgWrapper>
                                <p>{item[0].name}</p>
                                <p>
                                    {this.props.currencyData}
                                    {this.currencySwitcher(item[0])}
                                </p>
                            </ListItem>
                        )
                    })}
                </ListWrapper>
            </>
        )
    }
}
//onClick={() => this.setState({...this.state, productClicked: item[0].id})}