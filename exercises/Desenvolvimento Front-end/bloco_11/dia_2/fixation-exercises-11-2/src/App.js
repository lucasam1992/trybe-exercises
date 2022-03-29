import React from 'react';
import Order from './Order';
import Image from './Image';
import UserProfile from './UserProfile';

class App extends React.Component {
  render(){
    const headphone = {
      id: 102,
      user: "cena@gmail.com",
      product: "Razer Headphone",
      price: {
        value: 99.99,
        currency: "dollars"
      }
    };

    const energyDrink = {
      id: 77,
      user: "cena@gmail.com",
      product: "Monster 500mL",
      price: {
        value: 9.99,
        currency: "dollars"
      }
    };
    return (
      <div>
        <h1>Order recently created</h1>
          <Order  order ={headphone}/>
          <Order  order ={energyDrink}/>
          <Image />
          <UserProfile />
      </div>
    );
  }
}

export default App;
