import React, { Component } from "react";

class Event extends Component {
  constructor() {
    super();

    this.state = {
      showDetails: false
    }
  }

  handleItemClicked = () => {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    const { event } = this.props;
    const { showDetails } = this.state;
    // console.log(event);

    if (!showDetails) {
      return <div className="event">
        <h1 className="title">{event.summary}</h1>
        <p className="date">{event.start.dateTime}</p>
        <div className="summary-location-wrapper">
          <p className="summary">@{event.summary}</p>
          <p className="location">| {event.location}</p>
        </div>

        <div className="button-wrapper">
          <button 
            className="toggle-details-btn details-btn"
            onClick={this.handleItemClicked}
          >Show Details</button>
        </div>
        
      </div>;
    }

    if (showDetails) {
      return <div className="event">
        <h1 className="title">{event.summary}</h1>
        <p className="date">{event.start.dateTime}</p>
        <div className="summary-location-wrapper">
          <p className="summary">@{event.summary}</p>
          <p className="location">| {event.location}</p>
        </div>
        
        <div className="expanded-details">
          <h2 className="about-event">About Event:</h2>
          <a className="calendar-link" href={event.htmlLink} >See Details on Google Calendar</a>
          <p className="description">{event.description}</p>
        </div>

        <button 
          className="toggle-details-btn details-btn"
          onClick={this.handleItemClicked}
        >Hide Details</button>
      </div>;
    }


  }
}

export default Event;