import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
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
    // if (window.location.href.startsWith("http://localhost")) {
    //   console.log("local");
    //   getEvents().then((events) => {
    //     this.setState({ 
    //       events: events.slice(0, 32),
    //       locations: extractLocations(events),
    //       number: 32,
    //       showWelcomeScreen: undefined
    //     });
    //   });
    // } else {
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
  // }
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(", ").shift()
      return {city, number};
    })
    return data;
  }

  render() {
    const { events, locations, number } = this.state;

    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents number={number} updateEvents={this.updateEvents} />
        <h4>Events in each city</h4>

        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <EventList events={events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  } 
  
}

export default App;
