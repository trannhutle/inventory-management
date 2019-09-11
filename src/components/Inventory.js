import React from "react";
import AddFishForm from "./AddFishForm";
import firebase from "firebase";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import PropTypes from "prop-types";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };
  componentDidMount(){
    firebase.auth().onAuthStateChanged (user =>{
      if (user){
        this.authHandler({user});
      }
    })
  }
  authHandler = async authData => {
    // 1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);

    // 2. claim it if there is no owner
    if (!store.owner) {
      // Save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    // 3. Set the state of the inventory component to reflect the curent user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.id
    });
    console.log(authData);
  };
  
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  
  logout = async () => {
    console.log("Logging out!!!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };
  
  render() {
    // create the logout button
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // Check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry! You are not the store owner</p>
          {logout}
        </div>
      );
    }

    // They muust be the owner of the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}
export default Inventory;
