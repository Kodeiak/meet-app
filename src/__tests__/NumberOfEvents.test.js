import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsWrapper;
    beforeAll( () => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    })

    test("render number input", () => {
      expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
    });

    test("renders number input correctly", () => {
      const number = NumberOfEventsWrapper.state("number");
      expect(NumberOfEventsWrapper.find(".number").prop("value")).toBe(number);
    });

    test("change state when number input changes", () => {
      NumberOfEventsWrapper.setState({
        number: 32
      })
      NumberOfEventsWrapper.find(".number").simulate("change", { target: { value: 1 }});
      expect(NumberOfEventsWrapper.state("number")).toBe(1);
    });

    // test("renders correct number of events according to state", () => {

    // })
});