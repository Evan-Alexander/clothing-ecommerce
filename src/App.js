import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSighUpPage from './pages/sign-in-sign-up/sign-in-sign-up';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }
  // As long as the user is signed into Firebase, there is an open subscription where the app can openly communicate with firebase.  In order to prevent memory leaks we want to close this when a user signs out.
  unSubscribeFromAuth = null;

  componentDidMount() {
    // this method will detect who is logging in or out from firebase and set that to 'user'
    this.unSubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log(user)
    })
  }

  // Unsubscribe the user
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signIn' component={SignInSighUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;