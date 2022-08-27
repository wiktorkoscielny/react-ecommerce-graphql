import React from 'react';

// components
import AllCateg from './AllCateg'
import TechCateg from './TechCateg'
import ClothesCateg from './ClothesCateg';

// styles

class StartPage extends React.PureComponent { // eslint-disable-next-line 
  constructor(props){
    super(props);
    this.state = {
      currency: ''
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
        return <AllCateg allCateg={this.props.allCateg} currencyData={this.props.currencyData}/>;
      case 'tech':
        return <TechCateg techCateg={this.props.techCateg} currencyData={this.props.currencyData}/>;
      case 'clothes':
        return <ClothesCateg clothesCateg={this.props.clothesCateg} currencyData={this.props.currencyData}/>
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
export default StartPage;