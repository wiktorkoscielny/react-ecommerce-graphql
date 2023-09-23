import React, { Component } from "react";

// components
import AllCateg from "../../categories/All/AllCateg";
import TechCateg from "../../categories/Tech/TechCateg";
import ClothesCateg from "../../categories/Clothes/ClothesCateg";

export default class HomepageComponent extends Component {
  constructor(props) {
    super(props);
  }
  renderSwitch = () => {
    switch (this.props.currentCategory) {
      case "all":
        return (
          <AllCateg
            currentPathname={this.props.currentPathname}
            handleProductAdd={this.props.handleProductAdd}
            inStock={this.props.inStock}
            allCateg={this.props.allCateg}
            currencyData={this.props.currencyData}
            currencySwitcher={this.props.currencySwitcher}
            productIdCallback={this.props.productIdCallback}
            loader={this.props.loader}
          />
        );
      case "tech":
        return (
          <TechCateg
            currentPathname={this.props.currentPathname}
            handleProductAdd={this.props.handleProductAdd}
            inStock={this.props.inStock}
            techCateg={this.props.techCateg}
            currencyData={this.props.currencyData}
            currencySwitcher={this.props.currencySwitcher}
            productIdCallback={this.props.productIdCallback}
            loader={this.props.loader}
          />
        );
      case "clothes":
        return (
          <ClothesCateg
            currentPathname={this.props.currentPathname}
            handleProductAdd={this.props.handleProductAdd}
            inStock={this.props.inStock}
            clothesCateg={this.props.clothesCateg}
            currencyData={this.props.currencyData}
            currencySwitcher={this.props.currencySwitcher}
            productIdCallback={this.props.productIdCallback}
            loader={this.props.loader}
          />
        );
    }
  };
  render() {
    return <section>{this.renderSwitch()}</section>;
  }
}
