import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";


const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('user has not clicked on an event element', () => {

    });

    let EventWrapper;
    when('list of events are populated', () => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    then('each event will be in its collapsed state', () => {
      expect(EventWrapper.find(".expanded-details")).toHaveLength(0);
    });
});

test('User can expand an event to see its details.', ({ given, when, then }) => {
    let EventWrapper;
    given('event is in its collapsed state', () => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
      expect(EventWrapper.find(".expanded-details")).toHaveLength(0);
    });

    when('user clicks the event', () => {
      EventWrapper.find(".toggle-details-btn").simulate("click");
    });

    then('the event will expand to show additional details', () => {
      expect(EventWrapper.find(".expanded-details")).toHaveLength(1);
    });
});

test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    let EventWrapper;
    given('event is in its expanded state', () => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
      EventWrapper.find(".toggle-details-btn").simulate("click");
      expect(EventWrapper.find(".expanded-details")).toHaveLength(1);
    });

    when('user clicks the event', () => {
      EventWrapper.find(".toggle-details-btn").simulate("click");
    });

    then('the event will collapse to hide additional details', () => {
      expect(EventWrapper.find(".expanded-details")).toHaveLength(0);
    });
});
});