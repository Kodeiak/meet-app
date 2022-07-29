import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from "../App";


const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
  test('32 is the default number.', ({ given, when, then }) => {
    let AppWrapper;
    given('events have loaded and user hasn\'t specified number of events to display', () => {
      
    });                                                                                       

    when('user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('thirty-two or less events will be displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(2);
    });
});

test('User can change the number of events they want to see.', ({ given, when, then }) => {  
    let AppWrapper;
    given('events have loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('user changes number of events to display (e.g. ten)', async () => {
      AppWrapper.update();
      await AppWrapper.find(".number").simulate("change", { target: { value: "1" }});
      AppWrapper.update();
    });

    then('total number of available events or ten of the available events, whichever is less, will be displayed', () => {
      expect(AppWrapper.find(".event")).toHaveLength(1);
    });
});
});