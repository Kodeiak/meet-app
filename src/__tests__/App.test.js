import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";

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

});