/*
 * @category  REG
 * @package   REG_ProductListingPage
 * @author    Wiktor Koscielny <wiktorkoscielny@gmail.com>
 */

import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductListingPageComponent from "./ProductListingPage.component";
// import RecipesComponent from "./Recipes.component";
// import {
//   deleteSingleRecipe,
//   deleteAllRecipes,
// } from "../../Store/Recipes/Recipes.actions";

/** @namespace Component/PLP/Container/mapStateToProps */
function mapStateToProps(state) {
  return {
    // recipes: state.recipe.recipes,
  };
}

/** @namespace Component/PLP/Container/mapDispatchToProps */
function mapDispatchToProps(dispatch) {
  return {
    // deleteSingleRecipe: (payload) => dispatch(deleteSingleRecipe(payload)),
    // deleteAllRecipes: () => dispatch(deleteAllRecipes()),
  };
}

/** @namespace REG/Component/PLP/Container */
class ProductListingPageContainer extends Component {
  static propTypes = {
    // recipes: PropTypes.object,
    // deleteSingleRecipe: PropTypes.func,
    // deleteAllRecipes: PropTypes.func,
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
