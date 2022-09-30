import React, { Component } from 'react'

// styled components
import { SectionsWrapper, LeftSection, MiddleSection, RightSection, Button, ListOfOptions } from './Styles';

// modals
import Config from '../modals/Config';

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {},
            currentPhoto: '',
            photoKey: 0,
            productOptions: {},
            currency: '',
            current1Option: '',
            current2Option: '',
            current3Option: '',
            // add product data to cart
            productDetailsSender: {}
        }
    }
    componentDidMount() {
        const productData = this.props.productData
        const productOptions = this.props.productData.attributes
        const currentCurrency = this.props.currentCurrency
        this.setState({
            ...this.state,
            productData: productData,
            currentPhoto: productData.gallery[0],
            productOptions: productOptions,
            currency: currentCurrency,
        })
    }
    changePhoto = (name, index) => {
        this.setState({
            ...this.state,
            currentPhoto: [name],
            photoKey: index
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
    changeFirstOption = (param1, param2) => {
        this.setState({
            ...this.state,
            current1Option: param1 + param2,
            nameOf1Option: param1,
            option1Details: param2
        })
    }
    changeSecondOption = (param1, param2) => {
        this.setState({
            ...this.state,
            current2Option: param1 + param2,
            nameOf2Option: param1,
            option2Details: param2
        })
    }
    changeThirdOption = (param1, param2) => {
        this.setState({
            ...this.state,
            current3Option: param1 + param2,
            nameOf3Option: param1,
            option3Details: param2
        })
    }
    render() {
        const propsData = this.props.productData
        const productGallery = this.props.productData.gallery
        const productOptions = this.props.productData.attributes
        const regex = /(<([^>]+)>)/ig
        // const inStock = this.props.inStock.find((i) => i.id === propsData.id)
        return (
            <section>
                <SectionsWrapper
                    inStock={this.props.inStock}
                >
                    {this.props.configComponent === true ? <Config modalText={this.props.modalText} configComponent={this.props.configComponent} /> : null}
                    <LeftSection>
                        {productGallery.map((item, index) => {
                            return (
                                <ul key={index}>
                                    <li>
                                        <img
                                            key={index}
                                            src={item}
                                            alt='View of the product'
                                            style={{ width: '64px', height: '54px', cursor: 'pointer', filter: this.state.photoKey === index ? 'brightness(0.89)' : 'none' }}
                                            onClick={() => this.changePhoto(item, index)}
                                        >
                                        </img>
                                    </li>
                                </ul>
                            )
                        })}
                    </LeftSection>
                    <MiddleSection>
                        {this.state.currentPhoto &&
                            <img src={this.state.currentPhoto} alt='View of the product in the bigger format' style={{ width: '500px', height: '500px' }}></img>
                        }
                    </MiddleSection>
                    <RightSection>
                        <h2>{propsData.brand}</h2>
                        <h3>{propsData.name}</h3>

                        {/* FIRST OPTION */}

                        {productOptions.slice(0, 1) && productOptions.slice(0, 1).map((item, index) => {
                            return (
                                <div key={index}>
                                    <h4>{item.id}:</h4>
                                    {item.items.map((i, c) => {
                                        return (
                                            <ListOfOptions key={c} onClick={() => this.changeFirstOption(item.id, i.id)} param1={item.id} param2={i.id} currentOption={this.state.current1Option} color={i.value}>
                                                {item.id !== 'Color' ? i.id : null}
                                            </ListOfOptions>
                                        )
                                    })}
                                </div>
                            )
                        })}

                        {/* SECOND OPTION */}

                        {productOptions.slice(1, 2) && productOptions.slice(1, 2).map((item, index) => {
                            return (
                                <div key={index}>
                                    <h4>{item.id}:</h4>
                                    {item.items.map((i, c) => {
                                        return (
                                            <ListOfOptions key={c} onClick={() => this.changeSecondOption(item.id, i.id)} param1={item.id} param2={i.id} currentOption={this.state.current2Option} color={i.value}>
                                                {item.id !== 'Color' ? i.id : null}
                                            </ListOfOptions>
                                        )
                                    })}
                                </div>
                            )
                        })}

                        {/* THIRD OPTION */}

                        {productOptions.slice(2, 3) && productOptions.slice(2, 3).map((item, index) => {
                            return (
                                <div key={index}>
                                    <h4>{item.id}:</h4>
                                    {item.items.map((i, c) => {
                                        return (
                                            <ListOfOptions key={c} onClick={() => this.changeThirdOption(item.id, i.id)} param1={item.id} param2={i.id} currentOption={this.state.current3Option} color={i.value}>
                                                {item.id !== 'Color' ? i.id : null}
                                            </ListOfOptions>
                                        )
                                    })}
                                </div>
                            )
                        })}

                        <h4>price:</h4>
                        <p style={{ fontSize: '24px', lineHeight: '18px', fontWeight: '700' }}>{this.props.currentCurrency}{this.currencySwitcher(this.props.productData)}</p>
                        <Button onClick={() => this.props.handleProductAdd(this.state.productData, [[this.state.nameOf1Option, this.state.current1Option],[this.state.nameOf2Option, this.state.current2Option], [this.state.nameOf3Option, this.state.current3Option]], this.state.productData.id, this.props.inStock)} configComponent={this.props.configComponent}>add to cart</Button>
                        <p>{(propsData.description).replace(regex, '')}</p>

                    </RightSection>
                </SectionsWrapper>
            </section>
        )
    }
}