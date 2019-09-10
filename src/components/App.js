import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes"

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  addFish = fish => {
    // 1 Take a copy of teh existing state
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
    this.setState({fishes: sampleFishes})
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Catch of the day" age={100} />
        </div>
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
        <Order />
      </div>
    );
  }
}

export default App;
