import React from "react";
import { Button, Modal, List, Card, Form, Select } from "semantic-ui-react";

import EmptySpace from "./EmptySpace";

class ActivitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newActivity: false, title: null, description: null };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  openNewActivityPopup() {
    this.setState({ newActivity: true });
  }

  closeNewActivityPopup() {
    this.setState({ newActivity: false });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleDayChange(event, value){
    this.setState({day:value.value});
  }

  handleSubmit(event) {
    this.props.postActivity(this.state.title, this.state.description);
    this.closeNewActivityPopup();
    this.setState({ newActivity: false, title: null, description: null });
    event.preventDefault();
  }

  handleSubmitDay(event, activityId) {
    this.props.postActivityDay(this.state.day, activityId);
    event.preventDefault();
  }

  render() {
    const daysOptions = Array.from({ length: 30 }, (v, k) => {
      const n = k + 1;
      return { key: n, value: n, text: "Day " + n };
    });
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              Activities{" "}
              <Button
                floated="right"
                icon="add"
                onClick={e => this.openNewActivityPopup(e)}
              />
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <List relaxed="divided">
              {this.props.activities.length === 0 && (
                <EmptySpace elementName={"activities"} />
              )}
              {this.props.activities.map(activity => (
                <List.Item>
                  {this.props.selectedItinerary && (
                    <List.Content floated="right">
                      <Form onSubmit={e => this.handleSubmitDay(e, activity.id)}>
                        <Form.Group>
                          <Select
                            name='day'
                            compact
                            placeholder="Select"
                            options={daysOptions}
                            onChange={this.handleDayChange}
                          />
                          <Form.Button>Add</Form.Button>
                        </Form.Group>
                      </Form>
                    </List.Content>
                  )}
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
        <Modal dimmer="blurring" open={this.state.newActivity}>
          <Modal.Header>New Activity</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  name="title"
                  label="Activity Name"
                  placeholder="Activity Name"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
                <Form.TextArea
                  fluid
                  name="description"
                  label="Description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
                <Button.Group>
                  <Form.Button color="red">Submit</Form.Button>
                  <Form.Button onClick={e => this.closeNewActivityPopup(e)}>
                    Cancel
                  </Form.Button>
                </Button.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default ActivitiesList;
