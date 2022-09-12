import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// components
import Dropdown from './Dropdown';
// style
import './Navbar.css';
// imgs
import LOGO from '../assets/logo.png'
import CART from '../assets/empty-cart.png'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyData: [],
      toggler: false,
    }
  }
  componentDidMount() {
    const props = this.props.data
    this.setState({
      currencyData: props
    })
  }
  currencySymbolOptions = [
    { value: this.props.data[0].symbol[0], text: '$' },
    { value: this.props.data[0].symbol[1], text: '£' },
    { value: this.props.data[0].symbol[2], text: 'A$' },
    { value: this.props.data[0].symbol[3], text: '¥' },
    { value: this.props.data[0].symbol[4], text: '₽' },
  ]
  dropdownToggler = () => {
    this.setState(prevState => ({
      ...this.state,
      toggler: !prevState.toggler
    }))
  }
  render() {
    return (
      <nav>
        <div className='nav__wrapper'>
          <div className='category__section'>
            <ul>
              <li>
                <Link
                  to='/'
                  onClick={() => this.props.toggleClicked('tech')}
                  className={this.props.currentCateg === 'tech' ? 'selected' : null}
                >
                  tech
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  onClick={() => this.props.toggleClicked('clothes')}
                  className={this.props.currentCateg === 'clothes' ? 'selected' : null}
                >

                  clothes

                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  onClick={() => this.props.toggleClicked('all')}
                  className={this.props.currentCateg === 'all' ? 'selected' : null}
                >

                  all

                </Link>
              </li>
            </ul>
          </div>
          <div className='logo__section'><Link to='/'><img src={LOGO} alt='logo' /></Link></div>
          <div className='buttons__section'>

            <select value={this.props.currencySymbol} onChange={this.props.handleOnChange} id='nav__select'>
              {this.currencySymbolOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>


            <button className='cart__btn'
            onClick={() => this.dropdownToggler()}
            >
              <img src={CART} alt='shopping cart button' />
            </button>
            <div className={this.props.quantityOfProducts > 0 ? 'floating__btn active__btn' : 'floating__btn'}>
              {this.props.quantityOfProducts}
            </div>

            
              <div className={this.state.toggler ? 'dropdown__wrapper dropdown__wrapper__active' : 'dropdown__wrapper'}>
                <div className={this.state.toggler ? 'dropdown__menu dropdown__visible' : 'dropdown__menu'}>
                  <Dropdown storageOfProducts={this.props.storageOfProducts} currentCurrency={this.props.currentCurrency} handleCartChange={this.props.handleCartChange} handlePhotoIncreament={this.props.handlePhotoIncreament} handlePhotoDecreament={this.props.handlePhotoDecreament} quantityAdd={this.props.quantityAdd} quantitySubtract={this.props.quantitySubtract} totalQuantity={this.props.totalQuantity}/>
                </div>
              </div>
            
            {/* <button><Link to='/cart' ><img src={CART} alt='shopping cart button' /></Link></button> */}
          </div>
        </div>
      </nav>
    )
  }
}
