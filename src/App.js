import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

//import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //destructure setCurrentUser from this.props
    //then destructure collectionsArray from props
    //const { setCurrentUser, collectionsArray } = this.props;
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //if user is logged in
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //check whether the snapshot updates (the document, it is a userRef not a collectionRef)
        //when it changes we attach this fact to a listener with .onSnapshot() function
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      //call our redux action to set the object in our reducer
      setCurrentUser(userAuth);
      //run this once to load the text data to the database
      // but we use map with the array of objects and destructuring to get only the object properties we want
      // in this case we don't want the id (firestore will create a random id for us) and we don't want the routeName
      /* addCollectionAndDocuments(
        'collections',
        collectionsArray.map(({ title, items }) => ({ title, items }))
      ); */
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          {/* Route component passed down 3 props, match, location, history */}
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />)}
          />
        </Switch>
      </div>
    );
  }
}

//we destrucrure from our state the user reducer
//const mapStateToProps = ({ user }) => ({
//new app component prop --> currentUser (the key of the object)
//the path here is root-reducer.js --> user.reducer.js
//  currentUser: user.currentUser
//});
const mapStateToProps = createStructuredSelector({
  //we create the component new props here
  currentUser: selectCurrentUser
  //collectionsArray: selectCollectionsForPreview
});

//new prop for our component called setCurrentUser (the key inside the returned object)
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// app component does not need the current user from the state, as the header component
export default connect(mapStateToProps, mapDispatchToProps)(App);
