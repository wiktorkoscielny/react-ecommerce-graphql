import React, { Component } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
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


            <button><img src={CART} alt='shopping cart button' /></button>
          </div>
        </div>
      </nav>
    )
  }
}
