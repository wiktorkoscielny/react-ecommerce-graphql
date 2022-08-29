import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// components
import Navbar from './components/navbar/Navbar'
import StartPage from './components/startpage/StartPage';
import DetailsPage from './components/detailspage/detalisPage';

//queries
import getCurrencies from './queries/GetCurriences';
import getProduct from './queries/GetProducts';
import getCategory from './queries/GetCategory';
import getAllCategories from './queries/GetAllCategories';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [{
        label: [],
        symbol: [],
      }],
      currentCurrency: '',
      techCateg: [],
      clothesCateg: [],
      allCateg: [],
      productId: {},
      pathnameId: '',
      currentCategory: 'tech',
    }
  }
  componentDidMount = async () => {
    // currencies
    const resultCurrencies = await JSON.parse(JSON.stringify((await getCurrencies())))
    this.setState({
      ...this.state,
      currencies: [{
        label: resultCurrencies.currencies.map(label => [label.label]),
        symbol: resultCurrencies.currencies.map(symbol => [symbol.symbol])
      }],
      currentCurrency: resultCurrencies.currencies[0].symbol[0]
    });
    // all categories
    // const allCategory = await JSON.parse(JSON.stringify((await getAllCategories())))
    // this.setState({
    //   ...this.state,
    //   categories: JSON.parse(JSON.stringify(allCategory)),
    // })

    // products by categ
    const techCateg = await JSON.parse(JSON.stringify((await getCategory('tech'))))
    const clothesCateg = await JSON.parse(JSON.stringify((await getCategory('clothes'))))
    const allCateg = await JSON.parse(JSON.stringify((await getCategory('all'))))
    this.setState({
      ...this.state,
      techCateg: techCateg.category.products.map(product => [product]),
      clothesCateg: clothesCateg.category.products.map(product => [product]),
      // allCateg: JSON.parse(JSON.stringify(allCateg)),
      allCateg: allCateg.category.products.map(product => [product])
    })
  }
  currencySymbolChanger(e) {
    e.preventDefault();
    this.setState({ ...this.state, currentCurrency: e.target.value })
  }
  toggleClicked = (param) => {
    const current = param
    this.setState({
      ...this.state,
      currentCategory: current
    })
  }
  handleProductIdCallback = async (childData) => {
    const product =  await JSON.parse(JSON.stringify((await getProduct(childData))))
    this.setState({
      ...this.state,
      productId: product.product,
      pathnameId: childData
    })
  }
  
  render() {
    return (
      <Router>
        <Navbar handleOnChange={(e) => this.currencySymbolChanger(e)} data={this.state.currencies} toggleClicked={this.toggleClicked} currentCateg={this.state.currentCategory} />
        <Routes>
          <Route path='/' element={<StartPage currencyData={this.state.currentCurrency} allCateg={this.state.allCateg} techCateg={this.state.techCateg} clothesCateg={this.state.clothesCateg} currentCategory={this.state.currentCategory} productClicked={this.props.productClicked} productIdCallback={this.handleProductIdCallback}/>} />
          <Route path={`/details/${this.state.pathnameId}`} element={<DetailsPage productData={this.state.productId} />} />
        </Routes>
      </Router>
    )
  }
}