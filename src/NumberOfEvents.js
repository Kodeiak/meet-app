import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {

  constructor() {
    super();

    this.state = {
      infoText: ""
    }
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({
        infoText: "Number must be between 1 and 32"
      })
    } else {
      this.setState({
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
          value={this.props.number}
          onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;