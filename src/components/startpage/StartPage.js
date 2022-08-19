import React from 'react';

// styles in css for now
import './StartPage.css'

class StartPage extends React.PureComponent { // eslint-disable-next-line 
  constructor(props){
    super(props);
    this.state = {
      currency: '',
    }
  }
  componentDidMount() {
    const currencyData = this.props.currencyData
    this.setState({
      currency: currencyData
    })
  }

  render() {
    return (  
      <section>
        <div className='temporary__wrapper'>Current Currency: {this.props.currencyData}</div>
      </section>    
    );
  } 
}
export default StartPage;