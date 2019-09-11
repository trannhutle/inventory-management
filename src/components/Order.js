import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }
  // This technique is used for reduce the heavy on rendering the layout
  renderOrder = key => {
    const fish = this.props.fishes[key];
    // make sure the fishes are loaded before using it
    if (!fish) return;
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    
    // Use transition group for rendering animation
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: {enter: 500, eixt: 500}
    }

    if (!isAvailable) {
      return (
        <CSSTransition {...this.transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <TransitionGroup component="span" className="count">
            <CSSTransition
              classNames="count"
              key={count}
              timeout={{ enter: 500, exit: 500 }}
            >
              <span>{count}</span>
            </CSSTransition>
          </TransitionGroup>
          lbl {fish.name}
          <button onClick={() => this.props.removeFromOrder(key)}>
            &times;
          </button>
          {formatPrice(count * fish.price)}
        </li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
export default Order;
