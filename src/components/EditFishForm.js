import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  };
  
  changeHandle = event => {
    console.log(event.currentTarget.value);
    console.log(event.currentTarget.name);
    // Update that fish
    // 1 take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      // [event.currentTarget.name] has meaning is that
      // after whole attributes are initialised on this object,
      // event.currentTarget.name while override of the attribute of
      // the <input name="xxx">, this field will be updated
      [event.currentTarget.name]: event.currentTarget.value
    };
    console.log(updatedFish);
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.changeHandle}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.changeHandle}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.changeHandle}
          value={this.props.fish.status}
        >
          <option name="av ailable">Fresh</option>
          <option name="unavailable">Sold out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          onChange={this.changeHandle}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.changeHandle}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}
export default EditFishForm;
