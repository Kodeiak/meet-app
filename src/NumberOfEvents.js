import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {

  constructor() {
    super();

    this.state = {
      number: 32,
      infoText: ""
    }
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({
        number: value,
        infoText: "Number must be between 1 and 32"
      })
    } else {
      this.setState({
        number: value,
        infoText: ""
      })
    }
    this.props.updateEvents(null, value);
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.infoText} />
        <input 
          type="number"
          className="number" 
          value={this.state.number}
          onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;