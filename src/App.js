import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// components
import Navbar from './components/navbar/Navbar'
import StartPage from './components/startpage/StartPage';
import DetailsPage from './components/detailspage/detalisPage';
import CartPage from './components/cartpage/CartPage'

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
      // sotrage of shopping cart
      storageOfProducts: {
        products: []
      }

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
    const product = await JSON.parse(JSON.stringify((await getProduct(childData))))
    this.setState({
      ...this.state,
      productId: product.product,
      pathnameId: childData
    })
  }
  handleProductAdd = (productData, chosenOptions, productId) => {
    const filteredOptions = chosenOptions.filter(item => item[0] !== undefined)
    const newProduct = {
      id: productId,
      productData: productData,
      chosenOptions: filteredOptions,
    }

    const existingProduct = this.state.storageOfProducts.products.find(el => el.newProduct.id === productId);
    if (existingProduct) {
      return alert('This product has already been added to cart')
    } else {
      this.setState({
        ...this.state,
        storageOfProducts: {
          products: [...this.state.storageOfProducts.products, { newProduct }]
        }
      })
    }

  }
  handleCartChange = (productId, param1, param2) => {
    const existingProduct = this.state.storageOfProducts.products.find(el => el.newProduct.id === productId);
    const newData = param2 + param1
    if (!existingProduct) return
    else {
      this.state.storageOfProducts.products.map(item => {
        if (item.newProduct.id === productId) {
          const found = item.newProduct.chosenOptions[0].indexOf(param2)
          const xd = item.newProduct.chosenOptions.splice(found, 1)
          item.newProduct.chosenOptions.push([param2, newData])
        } return item
      })
      // tamte rzeczy zmapowac ze stanu a opcje z propsa
      const numberOfUpdating = 'stateUpdated'
      this.setState({ stateUpdated: numberOfUpdating }) // force state update after mutating of array
    }
  }
  render() {
    return (
      <Router>
        <Navbar handleOnChange={(e) => this.currencySymbolChanger(e)} data={this.state.currencies} toggleClicked={this.toggleClicked} currentCateg={this.state.currentCategory} />
        <Routes>
          <Route path={`/details/${this.state.pathnameId}`} element={<DetailsPage productData={this.state.productId} currentCurrency={this.state.currentCurrency} storageOfProducts={this.state.storageOfProducts} handleProductAdd={this.handleProductAdd} />} />
          <Route exact path='/' element={<StartPage currencyData={this.state.currentCurrency} allCateg={this.state.allCateg} techCateg={this.state.techCateg} clothesCateg={this.state.clothesCateg} currentCategory={this.state.currentCategory} productClicked={this.props.productClicked} productIdCallback={this.handleProductIdCallback} />} />
          <Route path={'/cart'} element={<CartPage storageOfProducts={this.state.storageOfProducts} currentCurrency={this.state.currentCurrency} handleCartChange={this.handleCartChange} />} />
        </Routes>
      </Router>
    )
  }
}
// add notfound route