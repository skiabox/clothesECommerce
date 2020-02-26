import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

export default function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  // useEffect is like "componentDidMount" and "componentDidUpdate" combined
  React.useEffect(() => {
    // the return value of "useEffect" is like the "componentWillUnmount" handler
    return auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          // the hook version of setState() doesn't accept a callback param, try useEffect instead (below)
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      }

      setCurrentUser(userAuth);
      //console.log(currentUser);
    });
  }, []);

  // not required. just logs to console every time currentUser changes
  React.useEffect(() => {
    console.log({ currentUser });
  }, [currentUser]);

  // it would probably be better to pass currentUser into a Context provider rather than
  // passing it directly thru props, assuming <Header> isn't the only component that will
  // need to read it.
  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}
