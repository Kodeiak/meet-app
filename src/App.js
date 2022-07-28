import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

import "./nprogress.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      locations: [],
      locationSelected: "all",
      number: 32
    }
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      this.setState({ 
        events: events.slice(0, 32),
        locations: extractLocations(events),
        number: 32 
      });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    let updatedEventCount;

    // !location ? updatedLocations = this.state.locationSelected : updatedLocations = location;
    if (!location) {
      location = this.state.locationSelected;
    }

    !eventCount ? updatedEventCount = this.state.number : updatedEventCount = eventCount;

    getEvents().then((events) => {
      const locationEvents = 
        (location === "all")?
        events :
        events.filter((event) => event.location === location);
      
      this.setState({
        events: locationEvents.slice(0, updatedEventCount),
        number: Number(updatedEventCount),
        locationSelected: location
      });
    });
  }

  render() {
    const { events, locations, number } = this.state;
    
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents number={number} updateEvents={this.updateEvents} />
        <EventList events={events} />
      </div>
    );
  } 
  
}

export default App;
