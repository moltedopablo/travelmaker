import React, { createRef, Component } from "react";
import { Card } from "semantic-ui-react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

class TripMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    let defaultCenter =
      this.props.locations.length === 0
        ? [-34.726713, -58.249482]
        : this.props.locations[0].coords;
    let bounds = this.props.locations.map(coord => coord.coords);
    console.log(bounds);
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Map</Card.Header>
        </Card.Content>
        <Card.Content>
          {this.props.mapReady && (
            <Map ref="tripMap" zoom={10} center={defaultCenter} bounds={bounds}>
              >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {this.props.locations.map(location => (
                <Marker key={1} position={location.coords}>
                  <Tooltip permanent direction='bottom'>
                    <span>{location.title}</span>
                  </Tooltip>
                  <Popup>
                    <span>{location.title}</span>
                  </Popup>
                </Marker>
              ))}
            </Map>
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default TripMap;
