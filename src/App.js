import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Navbar from "./components/navbar/Navbar";
import StartPage from "./components/startpage/StartPage";
import DetailsPage from "./components/detailspage/detalisPage";
import CartPage from "./components/cartpage/CartPage";

//queries
import getCurrencies from "./queries/GetCurriences";
import getCategory from "./queries/GetCategory";
import checkForInStock from "./queries/CheckForInStock";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [
        {
          label: [],
          symbol: [],
        },
      ],
      currentCurrency: "$",
      techCateg: [],
      clothesCateg: [],
      allCateg: [],
      productId: {},
      pathnameId: "",
      currentCategory: "tech",
      // sotrage of shopping cart
      storageOfProducts: {
        products: [],
      },
      forceUpdate: 1,
      configComponent: false,
      modalText: "",
      inStock: [],
    };
  }

  // // Managing the state of the application

  componentDidMount = async () => {
    // localStorage
    const localCurrentCurrency = localStorage.getItem("currentCurrency"),
      localCurrentCategory = localStorage.getItem("currentCategory"),
      localStorageOfProducts = localStorage.getItem("storageOfProducts");

    if (localStorageOfProducts) {
      this.setState({
        ...this.state,
        storageOfProducts: JSON.parse(localStorageOfProducts),
      });
    }

    // requested products sorted by category
    const techFetchedCateg = await JSON.parse(
      JSON.stringify(await getCategory("tech"))
    );
    const clothesFetchedCateg = await JSON.parse(
      JSON.stringify(await getCategory("clothes"))
    );
    const allFetchedCateg = await JSON.parse(
      JSON.stringify(await getCategory("all"))
    );

    // currencies
    const resultCurrencies = await JSON.parse(
      JSON.stringify(await getCurrencies())
    );

    // set state with new variables on component mount
    this.setState({
      ...this.state,
      techCateg: techFetchedCateg.category.products.map((product) => [product]),
      clothesCateg: clothesFetchedCateg.category.products.map((product) => [
        product,
      ]),
      // allCateg: JSON.parse(JSON.stringify(allCateg)),
      allCateg: allFetchedCateg.category.products.map((product) => [product]),
      currencies: [
        {
          label: resultCurrencies.currencies.map((label) => [label.label]),
          symbol: resultCurrencies.currencies.map((symbol) => [symbol.symbol]),
        },
      ],
      currentCurrency: localCurrentCurrency,
      currentCategory: localCurrentCategory,
    });

    // create state with inStock data just to use inStock request
    let arr = [];
    this.state.allCateg.map(async (item) => {
      const requestInStockInfo = await JSON.parse(
        JSON.stringify(await checkForInStock(item[0].id))
      );
      arr.push({ id: item[0].id, inStock: requestInStockInfo.product.inStock });
      return this.setState({
        inStock: arr,
      });
    });
  };

  // // Functions

  // change current currency
  currencySymbolChanger = (value) => {
    this.setState(
      {
        currentCurrency: value,
      },
      () => localStorage.setItem("currentCurrency", value)
    );
  };

  // change current category of products
  toggleClicked = (param) => {
    const current = param;
    this.setState(
      {
        ...this.state,
        currentCategory: current,
      },
      () => localStorage.setItem("currentCategory", current)
    );
  };

  // add choosen product to cart
  handleProductAdd = (productData, chosenOptions, productId) => {
    // remove undefined and empty array from chosen options (when there is less than 3 options to choose)
    Object.keys(chosenOptions).forEach(
      (key) => chosenOptions[key][0] === undefined && delete chosenOptions[key]
    );
    const removed = chosenOptions.filter((i) => i !== null);

    // check if product has specified options
    const filteredOptions = chosenOptions.filter(
      (item) => item[0] !== undefined
    );

    // check if there is at least one same product already add to cart
    const existingProduct = this.state.storageOfProducts.products.find(
      (el) => el.newProduct.id === productId
    );

    // get all same products already add to cart
    const matchingItems = this.state.storageOfProducts.products.filter((i) =>
      i.newProduct.id.includes(productId)
    );
    const findOneMatchingItem = matchingItems.find(
      (e) =>
        JSON.stringify(e.newProduct.chosenOptions) === JSON.stringify(removed)
    );

    // add new product
    const newProduct = {
      id: productId,
      productData: productData,
      chosenOptions: filteredOptions,
      slideHandler: 0,
      quantity: 1,
      uniqueId: new Date().valueOf(),
    };

    if (existingProduct && findOneMatchingItem) {
      this.setState({
        ...this.state,
        configComponent: true,
        modalText: "This product has been already added to cart",
      });
      setTimeout(() => {
        this.setState({ configComponent: false });
      }, 1200);
    } else if (
      newProduct.chosenOptions.length !==
      newProduct.productData.attributes.length
    ) {
      this.setState({
        ...this.state,
        configComponent: true,
        modalText: "Choose product options first",
      });
      setTimeout(() => {
        this.setState({ configComponent: false });
      }, 1200);
    } else {
      this.setState(
        {
          ...this.state,
          storageOfProducts: {
            products: [
              ...this.state.storageOfProducts.products,
              { newProduct },
            ],
          },
          totalQuantity: this.state.totalQuantity + newProduct.quantity,
          configComponent: true,
          modalText: "Succes! Product added to cart",
        },
        () =>
          localStorage.setItem(
            "storageOfProducts",
            JSON.stringify(this.state.storageOfProducts)
          )
      );
    }
    setTimeout(() => {
      this.setState({ configComponent: false });
    }, 1200);
  };

  // change configuration of product added to cart
  handleCartChange = (productId, param1, param2, uniqueIdParameter) => {
    const existingProduct = this.state.storageOfProducts.products.find(
      (el) => el.newProduct.id === productId
    );
    const newData = param2 + param1;
    if (!existingProduct) return;
    else {
      this.state.storageOfProducts.products.map((item) => {
        // change found product options according to its unique id
        if (item.newProduct.uniqueId === uniqueIdParameter) {
          let index = null;
          for (let i = 0; i < item.newProduct.chosenOptions.length; i++) {
            if (item.newProduct.chosenOptions[i][0] === param2) {
              index = i;
              break;
            }
          }
          item.newProduct.chosenOptions.splice(index, 1, [param2, newData]);
        }
        return item;
      });
      // force rerender and update config in local storage product data
      this.setState({ ...this.state, forceUpdate: 1 }, () =>
        localStorage.setItem(
          "storageOfProducts",
          JSON.stringify(this.state.storageOfProducts)
        )
      );
    }
  };

  // change the displayed product image to the next one
  handlePhotoIncreament = (param) => {
    const existingProduct = this.state.storageOfProducts.products.find(
      (el) => el.newProduct.id === param
    );
    if (!existingProduct) return;
    else {
      this.state.storageOfProducts.products.map((item) => {
        if (item.newProduct.id === param) {
          const arrayLength = item.newProduct.productData.gallery.length - 2;
          if (item.newProduct.slideHandler <= arrayLength) {
            item.newProduct.slideHandler++;
          } else if (item.newProduct.slideHandler === arrayLength + 1) {
            item.newProduct.slideHandler = 0;
          }
        }
        return item;
      });
      // force rerender and update current displayed product img in local storage
      this.setState({ ...this.state, forceUpdate: 1 }, () =>
        localStorage.setItem(
          "storageOfProducts",
          JSON.stringify(this.state.storageOfProducts)
        )
      );
    }
  };

  // change the displayed product image to the previous one
  handlePhotoDecreament = (param) => {
    const existingProduct = this.state.storageOfProducts.products.find(
      (el) => el.newProduct.id === param
    );
    if (!existingProduct) return;
    else {
      this.state.storageOfProducts.products.map((item) => {
        if (item.newProduct.id === param) {
          const arrayLength = item.newProduct.productData.gallery.length - 1;
          if (item.newProduct.slideHandler <= arrayLength) {
            item.newProduct.slideHandler--;
          }
          if (item.newProduct.slideHandler < 0) {
            item.newProduct.slideHandler = arrayLength;
          }
        }
        return item;
      });
      // force rerender and update current displayed product img in local storage
      this.setState({ ...this.state, forceUpdate: 1 }, () =>
        localStorage.setItem(
          "storageOfProducts",
          JSON.stringify(this.state.storageOfProducts)
        )
      );
    }
  };

  // change quantity of product already added to cart
  quantityAdd = (param) => {
    this.state.storageOfProducts.products.map((item) => {
      if (item.newProduct.id === param) {
        item.newProduct.quantity++;
      }
      return item;
    });
    // force rerender after 'storageOfProducts' state array mutated
    this.setState(
      {
        ...this.state,
        forceUpdate: 1,
        // update products stored in local storage
      },
      () =>
        localStorage.setItem(
          "storageOfProducts",
          JSON.stringify(this.state.storageOfProducts)
        )
    );
  };

  // change quantity of product added to cart
  quantitySubtract = (param) => {
    this.state.storageOfProducts.products.map((item) => {
      if (item.newProduct.id === param) {
        if (item.newProduct.quantity === 1) {
          const find = this.state.storageOfProducts.products.find(
            (el) => el.newProduct.id === param
          );
          const index = this.state.storageOfProducts.products.indexOf(find);
          this.state.storageOfProducts.products.splice(index, 1);
        } else if (item.newProduct.quantity > 0) {
          item.newProduct.quantity--;
        }
      }
      return item;
    });
    // force rerender after 'storageOfProducts' state array mutated
    this.setState(
      {
        ...this.state,
        forceUpdate: 1,
        // update products stored in local storage
      },
      () =>
        localStorage.setItem(
          "storageOfProducts",
          JSON.stringify(this.state.storageOfProducts)
        )
    );
  };

  // change the currency in which the product prices are displayed
  currencySwitcher = (param) => {
    switch (this.state.currentCurrency) {
      case "$":
        return <>{param.prices[0].amount}</>;
      case "£":
        return <>{param.prices[1].amount}</>;
      case "A$":
        return <>{param.prices[2].amount}</>;
      case "¥":
        return <>{param.prices[3].amount}</>;
      case "₽":
        return <>{param.prices[4].amount}</>;
    }
  };

  render() {
    return (
      <Router>
        <Navbar
          handleOnChange={this.currencySymbolChanger}
          data={this.state.currencies}
          toggleClicked={this.toggleClicked}
          currentCateg={this.state.currentCategory}
          quantityOfProducts={this.state.storageOfProducts.products.length}
          storageOfProducts={this.state.storageOfProducts}
          currentCurrency={this.state.currentCurrency}
          handleCartChange={this.handleCartChange}
          handlePhotoIncreament={this.handlePhotoIncreament}
          handlePhotoDecreament={this.handlePhotoDecreament}
          quantityAdd={this.quantityAdd}
          quantitySubtract={this.quantitySubtract}
          totalQuantity={this.state.totalQuantity}
        />
        <Routes>
          {this.state.allCateg.map((item, index) => {
            return (
              <Route
                key={index}
                path={`/details/${item[0].id}`}
                element={
                  <DetailsPage
                    modalText={this.state.modalText}
                    configComponent={this.state.configComponent}
                    productData={item[0]}
                    currentCurrency={this.state.currentCurrency}
                    storageOfProducts={this.state.storageOfProducts}
                    handleProductAdd={this.handleProductAdd}
                  />
                }
              />
            );
          })}
          <Route
            exact
            path="/"
            element={
              <StartPage
                inStock={this.state.inStock}
                currencySwitcher={this.currencySwitcher}
                currencyData={this.state.currentCurrency}
                allCateg={this.state.allCateg}
                techCateg={this.state.techCateg}
                clothesCateg={this.state.clothesCateg}
                currentCategory={this.state.currentCategory}
                productClicked={this.props.productClicked}
                productIdCallback={this.handleProductIdCallback}
              />
            }
          />
          <Route
            path={"/cart"}
            element={
              <CartPage
                storageOfProducts={this.state.storageOfProducts}
                currentCurrency={this.state.currentCurrency}
                handleCartChange={this.handleCartChange}
                handlePhotoIncreament={this.handlePhotoIncreament}
                handlePhotoDecreament={this.handlePhotoDecreament}
                quantityAdd={this.quantityAdd}
                quantitySubtract={this.quantitySubtract}
                totalQuantity={this.state.totalQuantity}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}
