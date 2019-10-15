import React from "react";
import { Placeholder } from "semantic-ui-react";

class EmptySpace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p class="empty-message">
          Wow, such an empty space, so sad, please add some {this.props.elementName} :)
        </p>
        <Placeholder fluid>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      </div>
    );
  }
}

export default EmptySpace;
