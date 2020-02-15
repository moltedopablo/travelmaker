import React from "react";
import _ from "lodash";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import EventWrapper from "react-big-calendar/lib/EventWrapper";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function TripEvent({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
}

class TripCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.availableColors = [
      "rbc-event-ligth-red",
      "rbc-event-ligth-green",
      "rbc-event-ligth-blue",
      "rbc-event-ligth-orange"
    ];
    this.state = {
      eventColors: []
    };
    this.customEventGetter = this.customEventGetter.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  customEventGetter = (
    event: Object,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    if (event.isActivity) {
      return { className: "rbc-event-activity" };
    } else {
      //Search if this event has a color assigned
      let index = _.findIndex(this.state.eventColors, function(o) {
        return o.id == event.id;
      });

      if (index > -1) {
        //If it has return the corresponding class
        return { className: this.state.eventColors[index].class };
      } else {
        //If not substract the already used color of the events to the available
        //pool and pick one
        let usedColors = this.state.eventColors.map(color => color.class);
        let possibleColors = this.availableColors.filter(
          n => !usedColors.includes(n)
        );
        //Default color if there no option
        if(possibleColors.length === 0){
          return { className: "rbc-event-ligth-red" };
        }
        var randomColor = _.sample(possibleColors);
        //Set state and return
        this.setState({
          availableColors: this.state.eventColors.push({
            id: event.id,
            class: randomColor
          })
        });
        return { className: randomColor };
      }
    }
  };

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    const daysOptions = Array.from({ length: 30 }, (v, k) => {
      const n = k + 1;
      return { key: n, value: n, text: "Day " + n };
    });

    let events = this.props.locations.map(location => {
      return {
        id: location.id,
        start: new Date(moment(location.start).add(1, "days")),
        end: new Date(moment(location.end).add(1, "days")),
        title: location.title,
        isActivity: false
      };
    });

    if (this.props.activities.length > 0) {
      const activities = _.keyBy(this.props.activities, "id");
      events = events.concat(
        this.props.activitiesItinerary.map(activityItinerary => {
          console.log(activityItinerary);
          return {
            start: new Date(moment(activityItinerary.day).add(1, "days")),
            end: new Date(moment(activityItinerary.day).add(1, "days")),
            title: activities[activityItinerary.activity].title,
            isActivity: true
          };
        })
      );
    }

    return (
      <DnDCalendar
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={this.onEventDrop}
        onEventResize={this.onEventResize}
        resizable
        style={{ height: "90vh" }}
        toolbar={true}
        eventPropGetter={this.customEventGetter}
        components={{
          event: TripEvent
        }}
      />
    );
  }
}

export default TripCalendar;
