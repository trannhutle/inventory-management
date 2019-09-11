import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";
import Proptypes from "prop-types"

class App extends React.Component {
  
  static propTypes = {
    match : Proptypes.object
  }
  
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    console.log("Component is mounted");
    const { params } = this.props.match;
    // 1. resinstate the localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    console.log(localStorageRef);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // 2. Sync sync firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: `fishes`
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    console.log(this.state.order);
    console.log("It is updated");

    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  addFish = fish => {
    // 1 Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2 Add our new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;

    // 3 Set the new fishes to state
    this.setState({
      fishes: fishes
    });
    console.log("Adding a fish!");
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // Take a copy
    const order = { ...this.state.order };
    // Either add tother ordder, or udpate the number in our order
    order[key] = order[key] + 1 || 1;
    // Call setState to update the state object
    this.setState({ order });
  };
  removeFromOrder = key => {
    // Take a copy
    const order = { ...this.state.order };
    // Update from state
    delete order[key];
    // Set that to state
    this.setState({ order });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = null;
    // 3. Update state
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Catch of the day"/>
          <ul className="fishes">
            {/* This is how to assign the data to the component by prop */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
            {/* <Fish /> */}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          loadSampleFishes={this.loadSampleFishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        /> 
      </div>
    );
  }
}

export default App;
