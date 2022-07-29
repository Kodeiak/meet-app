Feature: Specify number of events

Scenario: 32 is the default number.
Given events have loaded and user hasn't specified number of events to display
When user opens the app
Then thirty-two or less events will be displayed

Scenario: User can change the number of events they want to see.
Given events have loaded
When user changes number of events to display (e.g. ten)
Then total number of available events or ten of the available events, whichever is less, will be displayed