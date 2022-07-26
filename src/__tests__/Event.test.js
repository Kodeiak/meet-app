import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> default component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]}/>);
  })

  test("render event title", () => {
    expect(EventWrapper.find(".title")).toHaveLength(1);
  });

  test("render event title correctly", () => {
    const title = "React is Fun";
    expect(EventWrapper.find(".title").text()).toEqual(title);
  });

  test("render event date", () => {
    expect(EventWrapper.find(".date")).toHaveLength(1);
  });

  test("render event date correctly", () => {
    const date  = "2020-05-20T14:00:00+02:00";
    expect(EventWrapper.find(".date").text()).toEqual(date);
  });


  test("render event summary", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });

  test("render event summary correctly", () => {
    const summary  = "@React is Fun";
    expect(EventWrapper.find(".summary").text()).toEqual(summary);
  });

  test("render event location", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });

  test("render event location correctly", () => {
    const location  = "| Berlin, Germany";
    expect(EventWrapper.find(".location").text()).toEqual(location);
  });

  test("render show details button", () => {
    expect(EventWrapper.find(".toggle-details-btn")).toHaveLength(1);
  });
  
  test("toggle state exists", () => {
    const showDetails = EventWrapper.state("showDetails");
    expect(EventWrapper.state("showDetails")).toBe(showDetails);
  });

  test("render show details button correctly", () => {
    expect(EventWrapper.find(".toggle-details-btn").text()).toEqual("Show Details")
  });


  test("does not render expanded details before click", () => {
    EventWrapper.setState({
      showDetails: false
    });
    expect(EventWrapper.find(".expanded-details")).toHaveLength(0);
  });


});

describe("<Event /> expanded component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]}/>);
  })


  test("change state when button is clicked", () => {
    EventWrapper.setState({
      showDetails: false
    });
    EventWrapper.find(".toggle-details-btn").simulate("click");
    expect(EventWrapper.state("showDetails")).toBe(true);
  });

  test("render additional details when showDetails state is true", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".expanded-details")).toHaveLength(1);
  });

  test("render second header", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".about-event")).toHaveLength(1);
  });

  test("render google calendar link", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".calendar-link")).toHaveLength(1);
  });

  test("render google calendar link correctly", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".calendar-link").prop("href")).toBe("https://www.google.com/calendar/event?eid=M3F0ZDZ1c2NxNHRzaTZnYzdubW10cHFsY3RfMjAyMDA1MjBUMTIwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20");
  });

  test("render description", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".description")).toHaveLength(1);
  });

  test("render google calendar link correctly", () => {
    EventWrapper.setState({
      showDetails: true
    });
    const description = "Love HTML, CSS, and JS? Want to become a cool front-end developer? \n\nReact is one of the most popular front-end frameworks. There is a huge number of job openings for React developers in most cities. \n\nJoin us in our free React training sessions and give your career a new direction. ";
    expect(EventWrapper.find(".description").text()).toBe(description);
  });

  test("render toggle details button correctly", () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find(".toggle-details-btn").text()).toBe("Hide Details");
  });
});