import React, { Fragment } from "react";
import { format } from "url";
import { getFunName } from "../helpers";
import PropTypes from "prop-types";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };
  // This is the reference to the input text
  myInput = React.createRef();

  // This is how to bind the click event into this this compoment
  goToStore = event => {
    //  Stop the form from subbmitting
    event.preventDefault();
    // Get the text from the input
    const storeName = this.myInput.current.value;
    // Chagen the page to the router
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          placeholder="Store Name"
          ref={this.myInput}
          required
          type="text"
          defaultValue={getFunName()}
        ></input>
        <button type="submit">Visit Store</button>
      </form>

      /* 
            <Fragment>
              <p>Fishs!</p>
              <form className="store">
                <h2> Please enter
                     a store</h2>
              </form>
            </Fragment>
             
        }*/
    );
  }
}

export default StorePicker;
