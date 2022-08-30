import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// styles
import { ListWrapper, ListItem, ImgWrapper } from './Styles';

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
                    {this.props.techCateg.map((item, index) => {
                        return (
                            <Link
                                to={`/details/${item[0].id}`}
                                key={index}
                                style={{textDecoration: 'none'}}
                            >
                                <ListItem
                                    onClick={() => this.props.productIdCallback(item[0].id)}
                                >
                                    <ImgWrapper src={item[0].gallery}></ImgWrapper>
                                    <p>{item[0].name}</p>
                                    <p>
                                        {this.props.currencyData}
                                        {this.currencySwitcher(item[0])}
                                    </p>
                                </ListItem>
                            </Link>
                        )
                    })}
                </ListWrapper>
            </>
        )
    }
}