import React, { Component } from 'react'

// styled components
import { SectionsWrapper, LeftSection, MiddleSection, RightSection, Button, ListOfOptions } from './Styles';

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {},
            currentPhoto: '',
            photoKey: 0,
            productSpec: {},
            currency: '',
            current1Option: '',
            current2Option: '',
            current3Option: '',
        }
    }
    componentDidMount() {
        const productData = this.props.productData
        const productSpec = this.props.productData.attributes
        const currentCurrency = this.props.currentCurrency
        this.setState({
            ...this.state,
            productData: productData,
            currentPhoto: productData.gallery[0],
            productSpec: productSpec,
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
            current1Option: param1 + param2
        })
    }
    changeSecondOption = (param1, param2) => {
        this.setState({
            ...this.state,
            current2Option: param1 + param2
        })
    }
    changeThirdOption = (param1, param2) => {
        this.setState({
            ...this.state,
            current3Option: param1 + param2
        })
    }
    render() {
        const propsData = this.props.productData
        const productGallery = this.props.productData.gallery
        const productSpec = this.props.productData.attributes
        const regex = /(<([^>]+)>)/ig
        return (
            <section>
                <SectionsWrapper>
                    <LeftSection>
                        {productGallery.map((item, index) => {
                            return (
                                <ul key={index}>
                                    <li>
                                        <img
                                            key={index}
                                            src={item}
                                            alt='product picture'
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
                            <img src={this.state.currentPhoto} alt='big picture of product' style={{ width: '500px', height: '500px' }}></img>
                        }
                    </MiddleSection>
                    <RightSection>
                        <h2>{propsData.brand}</h2>
                        <h3>{propsData.name}</h3>

                        {/* FIRST SPEC */}

                        {productSpec.slice(0, 1) && productSpec.slice(0, 1).map((item, index) => {
                            return (
                                <div key={index}>
                                    <h4>{item.id}:</h4>
                                    {item.items.map((i, c) => {
                                        return (
                                            <ListOfOptions key={c} onClick={() => this.changeFirstOption(item.id, i.id)} param1={item.id} param2={i.id} currentOption={this.state.current1Option}>
                                                {i.id}
                                            </ListOfOptions>
                                        )
                                    })}
                                </div>
                            )
                        })}

                        {/* SECONDSPEC */}

                        {productSpec.slice(1, 2) && productSpec.slice(1, 2).map((item, index) => {
                            return (
                                <div key={index}>
                                    <h4>{item.id}:</h4>
                                    {item.items.map((i, c) => {
                                        return (
                                            <ListOfOptions key={c} onClick={() => this.changeSecondOption(item.id, i.id)} param1={item.id} param2={i.id} currentOption={this.state.current2Option}>
                                                {i.id}
                                            </ListOfOptions>
                                        )
                                    })}
                                </div>
                            )
                        })}

                        {/* THIRD SPEC */}

                        {productSpec.slice(2, 3) && productSpec.slice(2, 3).map((item, index) => {
                            return (
                                <div key={index}>
                                    <h4>{item.id}:</h4>
                                    {item.items.map((i, c) => {
                                        return (
                                            <ListOfOptions key={c} onClick={() => this.changeThirdOption(item.id, i.id)} param1={item.id} param2={i.id} currentOption={this.state.current3Option}>
                                                {i.id}
                                            </ListOfOptions>
                                        )
                                    })}
                                </div>
                            )
                        })}

                        <h4>price:</h4>
                        <p style={{ fontSize: '24px', lineHeight: '18px', fontWeight: '700' }}>{this.props.currentCurrency}{this.currencySwitcher(this.props.productData)}</p>
                        <Button>add to cart</Button>
                        <p>{(propsData.description).replace(regex, '')}</p>

                    </RightSection>
                </SectionsWrapper>
            </section>
        )
    }
}