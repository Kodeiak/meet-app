import React, { Component } from "react";

class NumberOfEvents extends Component {

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
  }

  render() {
    return (
      <div className="NumberOfEvents">
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