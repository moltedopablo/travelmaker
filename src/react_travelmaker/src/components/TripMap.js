import React from "react";
import { Button, Modal, Image, Header, List, Card } from "semantic-ui-react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

class TripMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Map</Card.Header>
        </Card.Content>
        <Card.Content>
          <Map
            style={{
              height: "600px",
              width: "100%"
            }}
            zoom={9}
            center={[10.2838, -74.4846 + 1.8]}
          >
            >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker key={1} position={[10.2838, -74.4846]}>
              <Popup>
                <span>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </span>
              </Popup>
            </Marker>
          </Map>
        </Card.Content>
      </Card>
    );
  }
}

export default TripMap;
