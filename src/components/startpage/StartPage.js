import React from 'react';

// styles in css for now
import './StartPage.css'

class StartPage extends React.PureComponent { // eslint-disable-next-line 
  constructor(props){
    super(props);
    this.state = {
      currency: '',
      products: []
    }
  }
  componentDidMount = async () => {
    const currencyData = this.props.currencyData
    this.setState({
      currency: currencyData,
      // products: allCateg
    })
  }

  render() {
    return (
      
      <section>
        <div className='temporary__wrapper'>Current Currency: {this.props.currencyData}</div>
        {this.props.allCateg ? 
          <ul>
          {this.props.allCateg.map((item, index) => {
            return(
              <li key={index}>
                {item[0].brand}
                <img src={item[0].gallery}/>
              </li>
            )
          })}
          </ul>
        : 'Loading....'}
      </section>    
    );
  } 
}
export default StartPage;