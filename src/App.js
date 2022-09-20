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
// import getAllCategories from './queries/GetAllCategories';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [{
        label: [],
        symbol: [],
      }],
      currentCurrency: '$',
      techCateg: [],
      clothesCateg: [],
      allCateg: [],
      productId: {},
      pathnameId: '',
      currentCategory: 'tech',
      // sotrage of shopping cart
      storageOfProducts: {
        products: []
      },
      forceUpdate: 1,
      configComponent: false,
      modalText: ''
    }
  }

  // ------ Managing the state of the application ------

  componentDidMount = async () => {
    // localStorage
    const localCurrentCurrency = localStorage.getItem('currentCurrency'),
          localCurrentCategory = localStorage.getItem('currentCategory'),
          localStorageOfProducts = localStorage.getItem('storageOfProducts'),
          localCurrentPathName = localStorage.getItem('currentPathName'),
          localCurrentProductId = localStorage.getItem('currentProductId')

    if (localStorageOfProducts || (localCurrentPathName && localCurrentProductId && localStorageOfProducts)) {
      this.setState({
        ...this.state,
        storageOfProducts: JSON.parse(localStorageOfProducts),
        productId: JSON.parse(localCurrentProductId),
        pathnameId: localCurrentPathName
      })
    } 

    // currencies
    const resultCurrencies = await JSON.parse(JSON.stringify((await getCurrencies())))
    this.setState({
      ...this.state,
      currencies: [{
        label: resultCurrencies.currencies.map(label => [label.label]),
        symbol: resultCurrencies.currencies.map(symbol => [symbol.symbol])
      }],
        currentCurrency: localCurrentCurrency,
        currentCategory: localCurrentCategory
    });
    // all categories
    // const allCategory = await JSON.parse(JSON.stringify((await getAllCategories())))
    // this.setState({
    //   ...this.state,
    //   categories: JSON.parse(JSON.stringify(allCategory)),
    // })

    // products by categ
    const techFetchedCateg = await JSON.parse(JSON.stringify((await getCategory('tech'))))
    const clothesFetchedCateg = await JSON.parse(JSON.stringify((await getCategory('clothes'))))
    const allFetchedCateg = await JSON.parse(JSON.stringify((await getCategory('all'))))
    this.setState({
      ...this.state,
      techCateg: techFetchedCateg.category.products.map(product => [product]),
      clothesCateg: clothesFetchedCateg.category.products.map(product => [product]),
      // allCateg: JSON.parse(JSON.stringify(allCateg)),
      allCateg: allFetchedCateg.category.products.map(product => [product])
    })
  }
  // ------ Functions ------

  // change current currency
  currencySymbolChanger = (value) => {
      this.setState({
        currentCurrency: value
      }, () => localStorage.setItem('currentCurrency', value))
  }
  // change current category of products
  toggleClicked = (param) => {
    const current = param
    this.setState({
      ...this.state,
      currentCategory: current
    }, () => localStorage.setItem('currentCategory', current))
  }
  // get id of clicked product and set that id as current pathname
  handleProductIdCallback = async (childData) => {
    const product = await JSON.parse(JSON.stringify((await getProduct(childData))))
    this.setState({
      ...this.state,
      // clicked product data that is passed to child
      productId: product.product,
      // id of clicked product for creating route path
      pathnameId: childData,
      }, () => localStorage.setItem('currentPathName', childData), localStorage.setItem('currentProductId', JSON.stringify(product.product))
    )
  }
  // add chosen product to cart
  handleProductAdd = (productData, chosenOptions, productId) => {
    const filteredOptions = chosenOptions.filter(item => item[0] !== undefined)
    const newProduct = {
      id: productId,
      productData: productData,
      chosenOptions: filteredOptions,
      slideHandler: 0,
      quantity: 1
    }
    const existingProduct = this.state.storageOfProducts.products.find(el => el.newProduct.id === productId);
    if (existingProduct) {
      this.setState({
        ...this.state, 
        configComponent: true, 
        modalText: 'This product has been already added to cart'
      })
      setTimeout(() => { this.setState({configComponent: false}) }, 3000)
    } else if (newProduct.chosenOptions.length !== newProduct.productData.attributes.length) {
      this.setState({
        ...this.state, 
        configComponent: true, 
        modalText: 'Choose product options first'
      })
      setTimeout(() => { this.setState({configComponent: false}) }, 3000)
    } else {
      this.setState({
        ...this.state,
        storageOfProducts: {
          products: [...this.state.storageOfProducts.products, { newProduct }]
        },
        totalQuantity: this.state.totalQuantity + newProduct.quantity,
        configComponent: true, 
        modalText: 'Succes! Product added to cart'
      }, () => localStorage.setItem('storageOfProducts', JSON.stringify(this.state.storageOfProducts)))
    }
    setTimeout(() => { this.setState({configComponent: false}) }, 3000)
  }
  // change config of product added to cart
  handleCartChange = (productId, param1, param2) => {
    const existingProduct = this.state.storageOfProducts.products.find(el => el.newProduct.id === productId);
    const newData = param2 + param1
    if (!existingProduct) return
    else {
      this.state.storageOfProducts.products.map(item => {
        if (item.newProduct.id === productId) {
          let index = null;
          for (let i = 0; i < item.newProduct.chosenOptions.length; i++) {
            if (item.newProduct.chosenOptions[i][0] === param2) {
              index = i;
              break;
            }
          }
          item.newProduct.chosenOptions.splice(index, 1, [param2, newData])
        } return item
      })
      // force rerender and update config in local storage product data
      this.setState({ ...this.state, forceUpdate: 1 }, 
        () => localStorage.setItem('storageOfProducts', JSON.stringify(this.state.storageOfProducts))
      )
    }
  }
  // change the displayed product image to the next one
  handlePhotoIncreament = (param) => {
    const existingProduct = this.state.storageOfProducts.products.find(el => el.newProduct.id === param);
    if (!existingProduct) return
    else {
      this.state.storageOfProducts.products.map(item => {
        if (item.newProduct.id === param) {
          const arrayLength = item.newProduct.productData.gallery.length - 2
          if (item.newProduct.slideHandler <= arrayLength) {
            item.newProduct.slideHandler++
          } else if (item.newProduct.slideHandler === arrayLength + 1) {
            item.newProduct.slideHandler = 0
          }
        } return item
      })
      // force rerender and update current displayed product img in local storage
      this.setState({ ...this.state, forceUpdate: 1 }, 
        () => localStorage.setItem('storageOfProducts', JSON.stringify(this.state.storageOfProducts))
      )
    }
  }
  // change the displayed product image to the previous one
  handlePhotoDecreament = (param) => {
    const existingProduct = this.state.storageOfProducts.products.find(el => el.newProduct.id === param);
    if (!existingProduct) return
    else {
      this.state.storageOfProducts.products.map(item => {
        if (item.newProduct.id === param) {
          const arrayLength = item.newProduct.productData.gallery.length - 1
          if (item.newProduct.slideHandler <= arrayLength) {
            item.newProduct.slideHandler--
          }
          if (item.newProduct.slideHandler < 0) {
            item.newProduct.slideHandler = arrayLength
          }
        } return item
      })
      // force rerender and update current displayed product img in local storage
      this.setState({ ...this.state, forceUpdate: 1 }, 
        () => localStorage.setItem('storageOfProducts', JSON.stringify(this.state.storageOfProducts))
      )
    }
  }
  // change quantity of product already added to cart
  quantityAdd = (param) => {
    this.state.storageOfProducts.products.map(item => {
      if (item.newProduct.id === param) {
        item.newProduct.quantity++
      } return item
    })
    // force rerender after 'storageOfProducts' state array mutated
    this.setState({
      ...this.state,
      forceUpdate: 1
      // update products stored in local storage
      }, () => localStorage.setItem('storageOfProducts', JSON.stringify(this.state.storageOfProducts))
    )
  }
  // change quantity of product added to cart
  quantitySubtract = (param) => {
    this.state.storageOfProducts.products.map(item => {
      if (item.newProduct.id === param) {
        if (item.newProduct.quantity === 1) {
          const find = this.state.storageOfProducts.products.find(el => el.newProduct.id === param)
          const index = this.state.storageOfProducts.products.indexOf(find)
          this.state.storageOfProducts.products.splice(index, 1)
        } else if (item.newProduct.quantity > 0 ) {
          item.newProduct.quantity--
        }
      } return item
    })
    // force rerender after 'storageOfProducts' state array mutated
    this.setState({
      ...this.state,
      forceUpdate: 1
      // update products stored in local storage
      }, () => localStorage.setItem('storageOfProducts', JSON.stringify(this.state.storageOfProducts))
    )
  }
  // change the currency in which the product prices are displayed
  currencySwitcher = (param) => {
    switch (this.state.currentCurrency) {
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
      <Router>
        <Navbar handleOnChange={this.currencySymbolChanger} data={this.state.currencies} toggleClicked={this.toggleClicked} currentCateg={this.state.currentCategory} quantityOfProducts={this.state.storageOfProducts.products.length} storageOfProducts={this.state.storageOfProducts} currentCurrency={this.state.currentCurrency} handleCartChange={this.handleCartChange} handlePhotoIncreament={this.handlePhotoIncreament} handlePhotoDecreament={this.handlePhotoDecreament} quantityAdd={this.quantityAdd} quantitySubtract={this.quantitySubtract} totalQuantity={this.state.totalQuantity}/>
        <Routes>
          <Route path={`/details/${this.state.pathnameId}`} element={<DetailsPage modalText={this.state.modalText} configComponent={this.state.configComponent} productData={this.state.productId} currentCurrency={this.state.currentCurrency} storageOfProducts={this.state.storageOfProducts} handleProductAdd={this.handleProductAdd} />} />
          <Route exact path='/' element={<StartPage currencySwitcher={this.currencySwitcher} currencyData={this.state.currentCurrency} allCateg={this.state.allCateg} techCateg={this.state.techCateg} clothesCateg={this.state.clothesCateg} currentCategory={this.state.currentCategory} productClicked={this.props.productClicked} productIdCallback={this.handleProductIdCallback} />} />
          <Route path={'/cart'} element={<CartPage storageOfProducts={this.state.storageOfProducts} currentCurrency={this.state.currentCurrency} handleCartChange={this.handleCartChange} handlePhotoIncreament={this.handlePhotoIncreament} handlePhotoDecreament={this.handlePhotoDecreament} quantityAdd={this.quantityAdd} quantitySubtract={this.quantitySubtract} totalQuantity={this.state.totalQuantity} />} />
        </Routes>
      </Router>
    )
  }
}
// add notfound route