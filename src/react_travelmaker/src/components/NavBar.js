import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selectedTrip = this.props.trips.find(obj => {
      return obj.id === this.props.selectedTrip;
    });


    return (
      <Menu>
        <Menu.Item id='site-name'>Travelmaker!</Menu.Item>
        {typeof selectedTrip !== "undefined" && (
          <Menu.Item onClick={this.props.clearTrip}>
            {selectedTrip.title}
          </Menu.Item>
        )}

      </Menu>
    );
  }
}

export default NavBar;
