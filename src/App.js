import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from "./mock-data";
import { extractLocations } from './api';

function App() {

  const locations = extractLocations(mockData);
  console.log("locations");
  return (
    <div className="App">
      <CitySearch locations={locations} />
      <NumberOfEvents />
      <EventList events={mockData} />
    </div>
  );
}

export default App;
