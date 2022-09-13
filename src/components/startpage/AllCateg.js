import React, { Component } from 'react'

// styles
import { ListWrapper, ListItem, ImgWrapper, MainWrapper, StyledLink, FloatingCart, TextWrapper } from './Styles';

// assets
import SmallCart from '../assets/white-cart.png'

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
            <MainWrapper>
                <h1>Tech</h1>
                <ListWrapper>
                    {this.props.allCateg.map((item, index) => {
                        return (
                            <StyledLink
                                to={`/details/${item[0].id}`}
                                key={index}
                            >
                                <ListItem
                                    onClick={() => this.props.productIdCallback(item[0].id)}
                                >
                                    <ImgWrapper>
                                        <img src={item[0].gallery}></img>
                                    </ImgWrapper>
                                    <TextWrapper>
                                        <p>{item[0].name}</p>
                                        <p>
                                            {this.props.currencyData}
                                            {this.currencySwitcher(item[0])}
                                        </p>
                                    </TextWrapper>
                                    <FloatingCart>   
                                        <img src={SmallCart}></img>
                                    </FloatingCart>
                                </ListItem>
                            </StyledLink>
                        )
                    })}
                </ListWrapper>
            </MainWrapper>
        )
    }
}