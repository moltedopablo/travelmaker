import React from "react";
import _ from "lodash";
import { Button, List, Card } from "semantic-ui-react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";


import EmptySpace from "./EmptySpace";

class ItineraryTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.clearSelectedItinerary = this.clearSelectedItinerary.bind(this);
  }

  clearSelectedItinerary() {
    this.props.clearItinerary();
  }

  render() {
    this.currentItinerary = this.props.itineraries.find(obj => {
      return obj.id === this.props.selectedItinerary;
    });

    const days = _.groupBy(this.props.activitiesItinerary, 'day');
    const activities = _.keyBy(this.props.activities, 'id')

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {typeof this.currentItinerary === "undefined"
              ? "Itineraries"
              : "Itinerary: " + this.currentItinerary.title}
            <Button floated="right" icon="add" />
            {this.props.selectedItinerary && (
              <Button
                floated="right"
                icon="undo"
                onClick={e => this.clearSelectedItinerary(e)}
              />
            )}
          </Card.Header>
        </Card.Content>
        <Card.Content>
          {this.props.selectedItinerary === null &&
            this.props.itineraries.length === 0 && (
              <EmptySpace elementName={"itineraries"} />
            )}
          {this.props.selectedItinerary === null &&
            this.props.itineraries.length > 0 && (
              <List relaxed="divided">
                {this.props.itineraries.map(itinerary => (
                  <List.Item>
                    <List.Content floated="right">
                      <Button
                        onClick={e => this.props.selectItinerary(itinerary.id)}
                      >
                        Select
                      </Button>
                    </List.Content>
                    <List.Content>
                      <List.Icon name="ligth-red sort numeric down" />
                      {itinerary.title}
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            )}
          {this.props.selectedItinerary !== null &&
            this.props.activitiesItinerary.length > 0 && (
              <Timeline lineColor={"#ddd"}>
                {Object.keys(days).map(day => (
                  <TimelineItem
                    dateText={"Day " + day}
                    style={{ color: "#e86971" }}
                  >
                    <List relaxed="very">
                      {days[day].map(activity => (
                        <List.Item>
                          <List.Icon name="map marker alternate" />
                          <List.Content>
                            <List.Header>{activities[activity.activity].title}</List.Header>
                            <List.Description>
                              {activities[activity.activity].description}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
        </Card.Content>
      </Card>
    );
  }
}

export default ItineraryTimeline;
