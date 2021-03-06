import React from "react";
import { Grid, Container } from "semantic-ui-react";
import Cookies from "js-cookie";

import NavBar from "./components/NavBar";
import TripChooser from "./components/TripChooser";
import ItineraryTimeline from "./components/ItineraryTimeline";
import ActivitiesList from "./components/ActivitiesList";
import TripMap from "./components/TripMap";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(Cookies.get("selected_trip"));
    this.state = {
      selectedTrip: null,
      selectedItinerary: null,
      trips: [],
      activities: [],
      activitiesItinerary: [],
      itineraries: []
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
  }

  fetchTrips() {
    fetch("//localhost:8000/api/trips/?format=json")
      .then(res => res.json())
      .then(data => {
        this.setState({ trips: data });
      });
  }

  fetchActivities(trip) {
    fetch("//localhost:8000/api/activities/?format=json&trip=" + trip)
      .then(res => res.json())
      .then(data => {
        this.setState({ activities: data });
      });
  }

  fetchItineraries(trip) {
    fetch("//localhost:8000/api/itineraries/?format=json&trip=" + trip)
      .then(res => res.json())
      .then(data => {
        this.setState({ itineraries: data });
      });
  }

  fetchActivitiesItinerary(itinerary) {
    fetch(
      "//localhost:8000/api/activities_itinerary/?format=json&itinerary=" +
        itinerary
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ activitiesItinerary: data });
      });
  }

  postTrip(tripName) {
    fetch("//localhost:8000/api/trips/?format=json", {
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
    fetch("//localhost:8000/api/activities/?format=json", {
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
    Cookies.set("selected_itinerary", itinerary);
    this.setState({ selectedItinerary: itinerary });
    this.setState({ activitiesItinerary: [] });
    this.fetchActivitiesItinerary(itinerary);
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
          <Grid padded columns={3}>
            <Grid.Row>
              <Grid.Column>
                <ActivitiesList
                  postActivity={this.postActivity}
                  activities={this.state.activities}
                  selectedItinerary={this.state.selectedItinerary}
                  postActivityDay={this.postActivityDay}
                />
              </Grid.Column>
              <Grid.Column>
                <ItineraryTimeline
                  itineraries={this.state.itineraries}
                  activities={this.state.activities}
                  selectedItinerary={this.state.selectedItinerary}
                  clearItinerary={this.clearSelectedItinerary}
                  selectItinerary={this.selectItinerary}
                  activitiesItinerary={this.state.activitiesItinerary}
                />
              </Grid.Column>
              <Grid.Column>
                <TripMap />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
