import React from 'react';
import { Route } from 'react-router-dom';
//bring shop actions with connect
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

//Wrap CollectionsOverview and CollectionPage with WithSpinner component
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//destructure the props passed from App.js Route component
//match.path property here is "/shop"
//we want to create /shop/:collection
class ShopPage extends React.Component {
  //constructor and super are called automatically
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    // destructure from this.props the new property we've just created with mapDispatchToProps
    const { updateCollections } = this.props;

    //get a reference to the 'collections' collection
    const collectionRef = firestore.collection('collections');

    //Rest API way
    //fetch('https://firestore.googleapis.com/v1/projects/crwn-db-ae9c6/databases/(default)/documents/collections')
    //.then(response => response.json())
    //.then(collections => console.log(collections));

    //Promise way
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      //console.log(collectionsMap);
      //update our reducer (using an action of course)
      updateCollections(collectionsMap);

      this.setState({ loading: false });
    });

    //we use the classic onSnapshot() method that attaches a listener
    //get data from our backend
    //this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
    //const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //console.log(collectionsMap);
    //update our reducer (using an action of course)
    //updateCollections(collectionsMap);

    //this.setState({ loading: false });
    //});
  }

  render() {
    //destructure match from our props
    const { match } = this.props;
    //destructure loading from our state
    const { loading } = this.state;

    //use render to pass logic along with the new withSpinner components
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    );
  }
}

/* Functional Component Code
 ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
); */

const mapDispatchToProps = dispatch => ({
  //create the new component property with the name of updateCollections
  //updateCollections is the new action we just created to get the data from the database
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
