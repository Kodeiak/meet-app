import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

// create new test group/scope called <App /> component
describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    // use shallow (w/o DOM or childen components) rendering API from Enzyme in order to run test
    AppWrapper = shallow(<App />);
  })

  test("render list of events", () => { //test description
    expect(AppWrapper.find(EventList)).toHaveLength(1);  // actual test > there should only be one Event List component
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

});

describe("<App /> integration", () => {
  let AppWrapper;
  beforeAll( () => {
    AppWrapper = mount(<App />);
  });
  
  afterAll(() => {
    AppWrapper.unmount();
  })
  
  test("App passes 'events' state as a prop to EventList", () => {
    AppWrapper.update();
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
  });

  test("App passes 'locations' state as a prop to CitySearch", () => {
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
  });

  test("get list of events matching the city selected by the user", async () => {
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
  });

  test("get list of all events when user selects 'see all cities'", async () => {
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
  })
})