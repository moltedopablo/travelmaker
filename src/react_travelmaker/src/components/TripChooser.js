import React from "react";
import { Button, Modal, List, Form } from "semantic-ui-react";

class TripChooser extends React.Component {
  constructor(props) {
    super(props);
    this.selectTrip = this.selectTrip.bind(this);
    this.openNewTripPopup = this.openNewTripPopup.bind(this);
    this.state = { newTrip: false, title: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectTrip(id) {
    this.props.selectTrip(id);
  }

  openNewTripPopup() {
    this.newTrip = true;
    console.log(this.newTrip);
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
    this.props.postTrip(this.state.title);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Modal dimmer="blurring" open={this.props.open && !this.state.newTrip}>
          <Modal.Header>
            Select a Trip
            <Button
              color="red"
              floated="right"
              onClick={e => this.setState({ newTrip: true })}
            >
              New Trip
            </Button>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <List divided verticalAlign="middle">
                {this.props.trips.map(trip => (
                  <List.Item>
                    <List.Content floated="right">
                      <Button onClick={e => this.selectTrip(trip.id, e)}>
                        Select
                      </Button>
                    </List.Content>

                    <List.Content>{trip.title}</List.Content>
                  </List.Item>
                ))}
              </List>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <Modal dimmer="blurring" open={this.state.newTrip && this.props.open}>
          <Modal.Header>New Trip</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  name="title"
                  label="Trip Name"
                  placeholder="Trip Name"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
                <Form.Button color="red">Submit</Form.Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default TripChooser;
