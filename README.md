# Meet App

To build a serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.

## Demo
[Meet App](https://kodeiak.github.io/meet-app/)

## Documentation

### Installation

```bash
 git clone [repository]
 cd meet-app
 npm install
```

### Dependencies
**For Development**
- React
- React Bootstrap
- Recharts (for Data Visualization)
- gh-pages

**For Testing**
- Jest
- Jest cucumber (ntegration Testing)
- Puppeteer (End-To-End-Testing)
- Enzyme
- Enzyme Adapter React 17
- Atatus browser testing

**Serverless**

AWS Lambda was utilized to 
- generate a token.
- pass it to the application after request


### Deployement

The app is deployed to github pages.
To deploy this project run
```bash
  npm run deploy
```

## Features

### FEATURE 1: As a user, I should be able to filter events so that I can see all the events for a specific city
	**Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.**
		- Given: user hasn't searched for any city
		- When: user opens app
		- Then: the user will see a list of all upcoming events
	**Scenario 2: User should see a list of suggestions when they search for a city.**
		- Given: events from all cities have been loaded
		- When: user starts typing city in search bar
		- Then:  list of city suggestions will be populated
	**Scenario 3: User can select a city from the suggested list.**
		- Given: user has started typing in city search and list of city suggestions are populated
		- When: user clicks on a city
		- Then: list of events will filter to just events for that city
### FEATURE 2: As a user, I should be able to click on an event so that I can toggle between showing and hiding an event's details
	**Scenario 1: An event element is collapsed by default.**
		- Given: user has not clicked on an event element
		- When: list of events are populated
		- Then: each event will be in its collapsed state
	**Scenario 2: User can expand an event to see its details.**
		- Given: event is in its collapsed state
		- When: user clicks the event
		- Then: the event will expand to show additional details
	**Scenario 3: User can collapse an event to hide its details.**
		- Given: event is in its expanded state
		- When: user clicks the event
		- Then: the event will collapse to hide additional details
### FEATURE 3: As a user, I should be able to change the number of events so that I can see as many events as I want
	**Scenario 1: When user hasn’t specified a number, 32 is the default number.**
		- Given: events have loaded and user hasn't specified number of events to display 
		- When: user opens the app
		- Then: 32 events will be displayed
	**Scenario 2: User can change the number of events they want to see.**
		- Given: events have loaded
		- When: user changes number (e.g. 50) of events to display
		- Then: total number of available events or 50 of the available events, whichever is less, will be displayed
### FEATURE 4: As a user, I should be able to use the app offline so that I can still see the events that were loaded when I was last online
	**Scenario 1: Show cached data when there’s no internet connection.**
		- Given: user is not connected to the internet
		- When: user opens app
		- Then: events from latest cache will be displayed 
	**Scenario 2: Show error when user changes the settings (city, time range).**
		- Given: user is not connected to the internet
		- When: user changes city or time range
		- Then: display alert/error that function is not allowed when offline
### FEATURE 5: As a user, I should be able to see a chart so that I can visualize the number of upcoming events by city
	**Scenario 1: Show a chart with the number of upcoming events in each city.**
		- Given: event data has been loaded
		- When: user opens app/clicks on visual…
    - Then: user will see a chart that shows number of upcoming events by city
