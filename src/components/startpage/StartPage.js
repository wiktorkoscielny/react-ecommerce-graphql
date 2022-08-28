import React, { Component } from 'react'

// components
import AllCateg from './AllCateg'
import TechCateg from './TechCateg'
import ClothesCateg from './ClothesCateg';

// styles

export default class StartPage extends Component { 
  constructor(props){
    super(props);
    this.state = {
      currency: '',
      productId: ''
    }
  }
  componentDidMount = async () => {
    const currencyData = this.props.currencyData
    this.setState({
      ...this.state,
      currency: currencyData
    })
  }
  renderSwitch = () => {
    switch(this.props.currentCategory) {
      case 'all':
        return <AllCateg allCateg={this.props.allCateg} currencyData={this.props.currencyData} productIdCallback={this.props.productIdCallback}/>;
      case 'tech':
        return <TechCateg techCateg={this.props.techCateg} currencyData={this.props.currencyData} productIdCallback={this.props.productIdCallback}/>;
      case 'clothes':
        return <ClothesCateg clothesCateg={this.props.clothesCateg} currencyData={this.props.currencyData} productIdCallback={this.props.productIdCallback}/>
      }
  }
  render() {
    return (
      <section>
        {this.renderSwitch()}
      </section>    
    );
  } 
}