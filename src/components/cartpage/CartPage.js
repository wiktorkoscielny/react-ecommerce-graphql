import React, { Component } from 'react';

import { CartWrapper, CartProduct, CartLeftSection, ReturnedProduct, CartRightSection, PhotoContainer, ListOfOptions, ListOfColors, QuantitySection, TitleWrapper, PhotoSection, Summary, ImgBtnLeft, ImgBtnRight } from './Styles'

// assets
import SLIDERLEFT from '../assets/slider-left.png'
import SLIDERRIGHT from '../assets/slider-right.png'

export default class CartPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productsAsProps: {},
            chosenOptions: []
        }
    }
    componentDidMount() {
        const listOfProducts = this.props.storageOfProducts
        const chosenOptions = listOfProducts.products[0].newProduct.chosenOptions
        this.setState({
            ...this.state,
            productsAsProps: listOfProducts,
            chosenOptions: [chosenOptions]
        })
    }
    currencySwitcher = (param) => {
        switch (this.props.currentCurrency) {
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
        const product = this.props.storageOfProducts
        return (
            <section>
                <CartWrapper>
                    <TitleWrapper>
                        <h1>cart</h1>
                    </TitleWrapper>


                    <CartProduct>
                        {product.products.map((item, index) => {
                            const option1 = item.newProduct.chosenOptions[0] ? item.newProduct.chosenOptions[0][1] : null
                            const option2 = item.newProduct.chosenOptions[1] ? item.newProduct.chosenOptions[1][1] : null
                            const option3 = item.newProduct.chosenOptions[2] ? item.newProduct.chosenOptions[2][1] : null
                            const number = item.newProduct.slideHandler
                            const productId = item.newProduct.id
                            return (
                                <ReturnedProduct key={index}>
                                    <CartLeftSection>
                                        <h1>{item.newProduct.productData.brand}</h1>
                                        <h2>{item.newProduct.productData.id}</h2>
                                        <h3>{this.props.currentCurrency}{this.currencySwitcher(item.newProduct.productData)}</h3>
                                        {item.newProduct.productData.attributes.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <p>{item.id}:</p>
                                                    {item.items.map((a, i) => {
                                                        return (
                                                            item.id !== 'Color' ?
                                                                <ListOfOptions key={i}
                                                                    propsOption1={option1 === null ? null : option1} propsOption2={option2 === null ? null : option2} propsOption3={option3 === null ? null : option3}
                                                                    paramId={a.id} paramName={item.id}
                                                                    onClick={() => this.props.handleCartChange(productId, a.id, item.id)}
                                                                >
                                                                    {item.id !== 'Color' ? a.id : null}
                                                                </ListOfOptions>

                                                                :

                                                                <ListOfColors key={i} color={a.value}
                                                                    propsOption1={option1 === null ? null : option1} propsOption2={option2 === null ? null : option2} propsOption3={option3 === null ? null : option3}
                                                                    paramId={a.id} paramName={item.id}
                                                                    onClick={() => this.props.handleCartChange(productId, a.id, item.id)}
                                                                >
                                                                    {item.id !== 'Color' ? a.id : null}
                                                                </ListOfColors>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </CartLeftSection>

                                    <CartRightSection>

                                        <QuantitySection></QuantitySection>

                                        <PhotoSection>
                                            <PhotoContainer>
                                                <img src={item.newProduct.productData.gallery[number]} alt='current photo of product' />
                                            </PhotoContainer>

                                            {item.newProduct.productData.gallery.length > 1 ?
                                                <ImgBtnLeft
                                                    onClick={() => this.props.handlePhotoDecreament(productId)}
                                                >
                                                    <img src={SLIDERLEFT} alt='left arrow' />
                                                </ImgBtnLeft>
                                                :
                                                null
                                            }
                                            {item.newProduct.productData.gallery.length > 1 ?
                                                <ImgBtnRight
                                                    onClick={() => this.props.handlePhotoIncreament(productId)}
                                                >
                                                    <img src={SLIDERRIGHT} alt='right arrow' />
                                                </ImgBtnRight>
                                                :
                                                null
                                            }
                                        </PhotoSection>

                                    </CartRightSection>

                                </ReturnedProduct>

                            )
                        })}

                    </CartProduct>

                    <Summary>
                        {/* tax
                        quantity
                        total
                        button */}
                    </Summary>

                </CartWrapper>
            </section>
        )
    }
}