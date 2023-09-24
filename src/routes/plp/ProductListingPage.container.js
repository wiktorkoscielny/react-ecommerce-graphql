/*
 * @category  REG
 * @package   REG_ProductListingPage
 * @author    Wiktor Koscielny <wiktorkoscielny@gmail.com>
 */

import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductListingPageComponent from "./ProductListingPage.component";
import getProduct from "./queries/GetProducts";

// import {
//   deleteSingleRecipe,
//   deleteAllRecipes,
// } from "../../Store/Recipes/Recipes.actions";
import {
  updateLoader,
  setProductId,
  setPathNameId
} from "../../store";

/** @namespace Component/PLP/Container/mapStateToProps */
function mapStateToProps(state) {
  return {
    currentPathname: state.regMainSlice.pathnameId,
    currencyData: state.regMainSlice.currentCurrency,
    allCateg: state.regMainSlice.allCateg,
    techCateg: state.regMainSlice.techCateg,
    clothesCateg: state.regMainSlice.clothesCateg,
    currentCategory: state.regMainSlice.currentCategory,
    // productClicked={this.props.productClicked} ????
  };
}

/** @namespace Component/PLP/Container/mapDispatchToProps */
function mapDispatchToProps(dispatch) {
  return {
    updateLoader: (payload) => dispatch(updateLoader(payload)),
    setProductId: (payload) => dispatch(setProductId(payload)),
    setPathNameId: (payload) => dispatch(setPathNameId(payload))
  };
}

/** @namespace REG/Component/PLP/Container */
class ProductListingPageContainer extends Component {
  static propTypes = {
    currentPathname: PropTypes.string,
    currencyData: PropTypes.string,
    // destructure and strict type !!!!!!!!!!!!!!!!!!!!!
    allCateg: PropTypes.object,
    techCateg: PropTypes.object,
    clothesCateg: PropTypes.object,
    currentCategory: PropTypes.string,
    updateLoader: PropTypes.func,
    setPathNameId: PropTypes.func,
    setProductId: PropTypes.func
  };

  handleProductIdCallback = async (childData) => {
    const {
      setPathNameId,
      setProductId,
      updateLoader
    } = this.props;

    // fetch the data of the clicked product
    const product = JSON.parse(JSON.stringify(await getProduct(childData)));
    
    // OLD FUNCTION CONSIDER SAVING LOCAL STORAGE IN A CALLBACK (NEEDED????)
    // this.setState(
    //   {
    //     ...this.state,
    //     // clicked product data that is passed to child
    //     productId: product.product,
    //     // id of clicked product for creating route path
    //     pathnameId: childData,
    //   },

    //   () => localStorage.setItem("currentPathName", childData),
    //   localStorage.setItem("currentProductId", JSON.stringify(product.product))
    // );

    setProductId(product.product);
    setPathNameId(childData);
    localStorage.setItem("currentPathName", childData);
    localStorage.setItem("currentProductId", JSON.stringify(product.product));
    updateLoader(false);
  };

  containerProps() {
    // const { recipes, deleteSingleRecipe, deleteAllRecipes } = this.props;

    return {
    //   recipes,
    //   deleteSingleRecipe,
    //   deleteAllRecipes,
    };
  }

  render() {
    return (
      <ProductListingPageComponent
        {...this.containerProps()}
        {...this.containerFunctions}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPageContainer);
