import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  // create this static because it does not need to create this varirable
  // when it it create new instances
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  };

  render() {
    // Assign the properteis from the object in props to the variable (CS6)
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add to Order" : "Sold out"}
        </button>
      </li>
    );
  }
}

export default Fish;
