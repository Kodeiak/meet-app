Feature: Show/hide an events details

Scenario: An event element is collapsed by default.
Given user has not clicked on an event element
When list of events are populated
Then each event will be in its collapsed state

Scenario: User can expand an event to see its details.
Given event is in its collapsed state
When user clicks the event
Then the event will expand to show additional details

Scenario: User can collapse an event to hide its details.
Given event is in its expanded state
When user clicks the event
Then the event will collapse to hide additional details