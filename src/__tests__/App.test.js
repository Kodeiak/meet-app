import React from "react";
import { shallow } from "enzyme";
import App from "../App";

// create new test group/scope called <App /> component
describe("<App /> component", () => {

  test("render list of events", () => { //test description
    const AppWrapper = shallow(<App />); // use shallow (w/o DOM or childen components) rendering API from Enzyme in order to run test
    expect(AppWrapper.find(EventList)).toHaveLength(1);  // actual test > there should only be one Event List component
  });


});