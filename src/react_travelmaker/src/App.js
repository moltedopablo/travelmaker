import React from "react";
import {
  Button,
  Modal,
  Image,
  Header,
  List,
  Card,
  Grid,
  Container
} from "semantic-ui-react";
import logo from "./logo.svg";
import NavBar from "./components/NavBar";
import TripChooser from "./components/TripChooser";
import ItineraryTimeline from "./components/ItineraryTimeline";
import ActivitiesList from "./components/ActivitiesList";
import TripMap from "./components/TripMap";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrip: null,
      selectedItinerary: null,
      trips: [],
      activities: [],
      dayRanges: [],
      itineraries: []
    };

    this.fetchItineraries = this.fetchItineraries.bind(this);
    this.fetchActivities = this.fetchActivities.bind(this);
    this.clearTrip = this.clearTrip.bind(this);
    this.postTrip = this.postTrip.bind(this);
    this.selectTrip = this.selectTrip.bind(this);
    this.fetchDayRanges = this.fetchDayRanges.bind(this);
    this.selectedItinerary = this.selectedItinerary.bind(this);
  }

  componentDidMount() {
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

  fetchDayRanges(itinerary) {
    fetch("//localhost:8000/api/day_ranges/?format=json&itinerary=" + itinerary)
      .then(res => res.json())
      .then(data => {
        this.setState({ dayRanges: data });
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

  selectTrip(trip) {
    this.setState({ selectedTrip: trip });
    this.setState({ selectedItinerary: null });
    this.fetchItineraries(trip);
    this.fetchActivities(trip);
  }

  selectedItinerary(itinerary) {
    this.setState({ selectedItinerary: itinerary });
    this.setState({ dayRanges: [] });
    this.fetchDayRanges(itinerary);
  }

  clearTrip() {
    this.setState({ selectedTrip: null });
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
                <ActivitiesList activities={this.state.activities} />
              </Grid.Column>
              <Grid.Column>
                <ItineraryTimeline
                  itineraries={this.state.itineraries}
                  selectedItinerary={this.state.selectedItinerary}
                  selectItinerary={this.selectedItinerary}
                  dayRanges={this.state.dayRanges}
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
