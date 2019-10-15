import React from "react";
import {
  Button,
  Modal,
  Image,
  Header,
  List,
  Card,
  Placeholder,
  Icon
} from "semantic-ui-react";

import EmptySpace from "./EmptySpace";

class ActivitiesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Activities</Card.Header>
        </Card.Content>
        <Card.Content>
          <List relaxed="divided">
            {this.props.activities.length === 0 &&
              <EmptySpace elementName={'activities'} />
            }
            {this.props.activities.map(activity => (
              <List.Item>
                <List.Content floated="right">
                  <Button>Add</Button>
                </List.Content>
                <List.Icon name="ligth-red map marker alternate" />
                <List.Content>
                  <List.Header>{activity.title}</List.Header>
                  <List.Description>{activity.description}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Card.Content>
      </Card>
    );
  }
}

export default ActivitiesList;
