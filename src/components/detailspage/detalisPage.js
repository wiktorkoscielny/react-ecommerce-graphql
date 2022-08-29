import React, { Component } from 'react'

// styled components
import { SectionsWrapper, LeftSection, MiddleSection, RightSection } from './Styles';

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {},
            currentPhoto: '',
            productSpec: {}
        }
    }
    componentDidMount() {
        const productData = this.props.productData
        const productSpec = this.props.productData.attributes
        this.setState({
            ...this.state,
            productData: productData,
            currentPhoto: productData.gallery[0],
            productSpec: productSpec
        })
    }
    changePhoto = (event) => {
        this.setState({
            currentPhoto: event
        })
    }
    render() {
        const propsData = this.props.productData
        const productGallery = this.props.productData.gallery
        const productSpec = this.props.productData.attributes
        return (
            <section>
                <SectionsWrapper>
                    <LeftSection>
                        {productGallery.map((item, index) => {
                            return (
                                <ul key={index}>
                                    <li>
                                        <img src={item} alt='product picture'></img>
                                    </li>
                                </ul>
                            )
                        })}
                    </LeftSection>
                    <MiddleSection>{this.state.currentPhoto && <img src={this.state.currentPhoto} alt='big picture of product'></img>}</MiddleSection>
                    <RightSection>
                        {propsData.brand}{propsData.name}
                        {productSpec.map((item, index) => {
                            return (
                                <div key={index}>
                                    <h1>{item.id}</h1>
                                    <ul>
                                        {item.items.map((a, c) => {
                                            return (
                                                <li key={c}>
                                                    {a.id}
                                                    {a.value}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </RightSection>
                </SectionsWrapper>
            </section>
        )
    }
}