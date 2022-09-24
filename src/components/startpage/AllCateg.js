import React, { Component } from "react";

// styles
import {
  ListWrapper,
  ListItem,
  ImgWrapper,
  MainWrapper,
  OutOfStockText,
  StyledLink,
  FloatingCart,
  ProductInStock,
  TextWrapper,
} from "./Styles";

// assets
import SmallCart from "../assets/white-cart.png";

export default class AllCateg extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <MainWrapper>
        <h1>Tech</h1>
        <ListWrapper>
          {this.props.allCateg.map((item, index) => {
            return (
              <ProductInStock key={index} inStock={item[0].inStock}>
                <OutOfStockText inStock={item[0].inStock}>
                  out of stock
                </OutOfStockText>
                <StyledLink to={`/details/${item[0].id}`}>
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
                        {this.props.currencySwitcher(item[0])}
                      </p>
                    </TextWrapper>
                    <FloatingCart>
                      <img src={SmallCart}></img>
                    </FloatingCart>
                  </ListItem>
                </StyledLink>
              </ProductInStock>
            );
          })}
        </ListWrapper>
      </MainWrapper>
    );
  }
}
