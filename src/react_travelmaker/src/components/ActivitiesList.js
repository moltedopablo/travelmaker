import React from "react";
import { Button, Modal, List, Card, Form } from "semantic-ui-react";

import EmptySpace from "./EmptySpace";

class ActivitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newActivity: false, title: null, description: null };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    this.props.postActivity(this.state.title, this.state.description);
    this.closeNewActivityPopup();
    this.setState({ newActivity: false, title: null, description: null });
    event.preventDefault();
  }

  render() {
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

                <div class="ui buttons">
                  <Form.Button color="red">Submit</Form.Button>
                  <div class="or"></div>
                  <Form.Button onClick={e => this.closeNewActivityPopup(e)}>
                    Cancel
                  </Form.Button>
                </div>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default ActivitiesList;
