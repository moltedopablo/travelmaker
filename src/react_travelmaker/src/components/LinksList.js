import React from "react";
import { Button, Modal, List, Card, Form, Select } from "semantic-ui-react";

import EmptySpace from "./EmptySpace";

class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newLink: false, url: null };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openNewLinkPopup() {
    this.setState({ newLink: true });
  }

  closeNewLinkPopup() {
    this.setState({ newLink: false });
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
    // this.props.postLink(this.state.title, this.state.description);
    this.closeNewLinkPopup();
    this.setState({ newLink: false, url: null});
    event.preventDefault();
  }

  render() {

    return (
      <div>
        <Card fluid className={'link-list'}>
          <Card.Content>
            <Card.Header>
              Useful Links{" "}
              <Button
                floated="right"
                icon="add"
                onClick={e => this.openNewLinkPopup(e)}
              />
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <List relaxed="divided">
              {this.props.links.length === 0 && (
                <EmptySpace elementName={"links"} />
              )}
              {this.props.links.map(link => (
                <List.Item>

                  <List.Content floated="left">
                    <a href={link.url}>{link.url}</a>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Card.Content>
        </Card>
        <Modal dimmer="blurring" open={this.state.newLink}>
          <Modal.Header>New Link</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  name="title"
                  label="URL"
                  placeholder="Link's URL"
                  value={this.state.url}
                  onChange={this.handleInputChange}
                />

                <Button.Group>
                  <Form.Button color="red">Submit</Form.Button>
                  <Form.Button onClick={e => this.closeNewLinkPopup(e)}>
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

export default LinksList;
