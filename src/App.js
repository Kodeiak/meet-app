import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';


import "./nprogress.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      locations: [],
      locationSelected: "all",
      number: 32,
      showWelcomeScreen: undefined
    }
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false: true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen : !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
        this.setState({ 
          events: events.slice(0, 32),
          locations: extractLocations(events),
          number: 32 
        });
        }
      });
    }
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

    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents number={number} updateEvents={this.updateEvents} />
        <EventList events={events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  } 
  
}

export default App;
