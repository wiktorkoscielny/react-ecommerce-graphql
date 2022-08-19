import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// components
import Navbar from './components/navbar/Navbar'
import StartPage from './components/startpage/StartPage';

//queries
import getCurrencies from './queries/GetCurriences';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currencies: [{
          label: [],
          symbol: [],
        }],
        currentCurrency: '',
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
           
  }
  currencySymbolChanger(e) {
    e.preventDefault();
    this.setState({ ...this.state, currentCurrency: e.target.value})
  }
  
  render() {

    return (
      <Router>
        <Navbar handleOnChange={(e) => this.currencySymbolChanger(e)} data={this.state.currencies} />
        <Routes>
          <Route path='/' element={<StartPage currencyData={this.state.currentCurrency} />} />
        </Routes>
      </Router>
    )
  }
}