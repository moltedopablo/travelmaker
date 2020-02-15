import React from "react";
import { Grid, Container } from "semantic-ui-react";
import Cookies from "js-cookie";
import moment from "moment";

import NavBar from "./components/NavBar";
import TripChooser from "./components/TripChooser";
import ItineraryTimeline from "./components/ItineraryTimeline";
import ActivitiesList from "./components/ActivitiesList";
import TripMap from "./components/TripMap";
import TripCalendar from "./components/TripCalendar";
import LinksList from "./components/LinksList";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.baseURL = "//localhost:8000/api/";
    this.state = {
      selectedTrip: null,
      selectedItinerary: null,
      trips: [],
      activities: [],
      activitiesItinerary: [
        // {
        //   id: 1,
        //   day: "2020-01-23T00:00:00Z",
        //   activity: 11,
        //   itinerary: 1
        // },
        // {
        //   id: 1,
        //   day: "2020-01-25T00:00:00Z",
        //   activity: 12,
        //   itinerary: 1
        // }
      ],
      itineraries: [],
      locations: [
        {
          id: 1,
          title: "Los reyunos",
          start: "2020-01-18T00:00:00Z",
          end: "2020-01-23T00:00:00Z",
          coords: [-34.602435, -68.64178]
        },
        {
          id: 2,
          title: "Uspallata",
          start: "2020-01-23T00:00:00Z",
          end: "2020-01-26T00:00:00Z",
          coords: [-32.59117, -69.348362]
        },
        {
          id: 3,
          title: "Mendoza",
          start: "2020-01-26T00:00:00Z",
          end: "2020-01-27T00:00:00Z",
          coords: [-32.885496, -68.857489]
        }
      ],
      links: [
        {
          id: 1,
          url:
            "https://www.reddit.com/r/spaceengine/comments/f2ovsm/hubble_space_telescope/"
        },
        {
          id: 2,
          url:
            "https://www.reddit.com/r/aww/comments/f3c3wb/before_and_after_playdate/"
        }
      ],
      mapReady: false
    };

    this.fetchTrips = this.fetchTrips.bind(this);
    this.fetchItineraries = this.fetchItineraries.bind(this);
    this.fetchActivities = this.fetchActivities.bind(this);
    this.clearTrip = this.clearTrip.bind(this);
    this.clearSelectedItinerary = this.clearSelectedItinerary.bind(this);
    this.postTrip = this.postTrip.bind(this);
    this.postActivity = this.postActivity.bind(this);
    this.selectTrip = this.selectTrip.bind(this);
    this.fetchActivitiesItinerary = this.fetchActivitiesItinerary.bind(this);
    this.selectItinerary = this.selectItinerary.bind(this);
    this.postActivityDay = this.postActivityDay.bind(this);
  }

  componentDidMount() {
    this.fetchTrips();
    if (typeof Cookies.get("selected_trip") !== "undefined") {
      this.selectTrip(parseInt(Cookies.get("selected_trip")));
    }

    if (typeof Cookies.get("selected_itinerary") != "undefined") {
      this.selectItinerary(parseInt(Cookies.get("selected_itinerary")));
    }

    setTimeout(
      function() {
        this.setState({ mapReady: true });
      }.bind(this),
      500
    );
  }

  fetchTrips() {
    fetch(this.baseURL + "trips/?format=json")
      .then(res => res.json())
      .then(data => {
        this.setState({ trips: data });
      });
  }

  fetchActivities(trip) {
    fetch(this.baseURL + "activities/?format=json&trip=" + trip)
      .then(res => res.json())
      .then(data => {
        this.setState({ activities: data });
      });
  }

  fetchItineraries(trip) {
    fetch(this.baseURL + "itineraries/?format=json&trip=" + trip)
      .then(res => res.json())
      .then(data => {
        this.setState({ itineraries: data });
      });
  }

  fetchActivitiesItinerary(itinerary) {
    // fetch(
    //   this.baseURL + "activities_itinerary/?format=json&itinerary=" +
    //     itinerary
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ activitiesItinerary: data });
    //   });
  }

  postTrip(tripName) {
    fetch(this.baseURL + "trips/?format=json", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: tripName
      })
    })
      .then(res => res.json())
      .then(data => {
        this.selectTrip(data.id);
      });
  }

  postActivity(title, description) {
    fetch(this.baseURL + "activities/?format=json", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trip: this.state.selectedTrip,
        title: title,
        description: description
      })
    })
      .then(res => res.json())
      .then(data => {
        this.fetchActivities(this.state.selectedTrip);
      });
  }

  postActivityDay(day, activity) {
    fetch("//localhost:8000/api/activities_itinerary/?format=json", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        activity: activity,
        day: day,
        itinerary: this.state.selectedItinerary
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          activitiesItinerary: [...this.state.activitiesItinerary, {day: day, activity: activity}]
        })
      });
  }

  selectTrip(trip) {
    Cookies.set("selected_trip", trip);
    this.setState({ selectedTrip: trip });
    this.setState({ selectedItinerary: null });
    this.fetchTrips();
    this.fetchItineraries(trip);
    this.fetchActivities(trip);
  }

  selectItinerary(itinerary) {
    // Cookies.set("selected_itinerary", itinerary);
    // this.setState({ selectedItinerary: itinerary });
    // this.setState({ activitiesItinerary: [] });
    // this.fetchActivitiesItinerary(itinerary);
  }

  clearTrip() {
    this.setState({ selectedTrip: null });
  }

  clearSelectedItinerary() {
    this.setState({ selectedItinerary: null });
  }

  render() {
    return (
      <div className="App">
        <NavBar
          trips={this.state.trips}
          selectedTrip={this.state.selectedTrip}
          clearTrip={this.clearTrip}
        />
        <TripChooser
          trips={this.state.trips}
          selectTrip={this.selectTrip}
          open={this.state.selectedTrip === null}
          postTrip={this.postTrip}
        />
        <Container fluid>
          <Grid padded columns={3} stackable  >
            <Grid.Row>
              <Grid.Column>
                <TripCalendar
                  locations={this.state.locations}
                  activitiesItinerary={this.state.activitiesItinerary}
                  activities={this.state.activities}
                />
              </Grid.Column>
              <Grid.Column>
                <ActivitiesList
                  postActivity={this.postActivity}
                  activities={this.state.activities}
                  selectedItinerary={this.state.selectedItinerary}
                  postActivityDay={this.postActivityDay}
                />
                <LinksList
                  links={this.state.links}
                />

              </Grid.Column>
              {/*<Grid.Column>
                <ItineraryTimeline
                  itineraries={this.state.itineraries}
                  activities={this.state.activities}
                  selectedItinerary={this.state.selectedItinerary}
                  clearItinerary={this.clearSelectedItinerary}
                  selectItinerary={this.selectItinerary}
                  activitiesItinerary={this.state.activitiesItinerary}
                />
              </Grid.Column>*/}
              <Grid.Column>
                <TripMap
                  locations={this.state.locations}
                  mapReady={this.state.mapReady}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
