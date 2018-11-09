import React, { Component } from 'react';
import './App.css';
import {
  GoogleMap,
  withGoogleMap,
} from "react-google-maps"

class MapWrapperBase extends React.Component {
  constructor(props) {
    super(props);
    // The offset represents the amount to offset
    // based on the 475 mas-width'ed <PanelContainer>
    this.offset = (475 / 2) * -1;
  }
  panTo(center) {
    this.map.panTo(center);
    this.map.panBy(this.offset, 0);
  }
  componentDidMount() {
    if (this.props.center) {
      this.panTo(this.props.center);
    }
  }
  componentWillReceiveProps(nextProps) {
    // The following logic allows the user to pan around manually
    // and not have the map recenter on them all the time. This
    // method stops the recenter, unless a new center is explicitly
    // passed
    const nextCenter = nextProps.center;
    const currCenter = this.props.center;
    if (nextCenter && !currCenter) {
      this.panTo(nextCenter);
    } else if (
      nextCenter &&
      (nextCenter.lat !== currCenter.lat || nextCenter.lng !== currCenter.lng)
    ) {
      this.panTo(nextCenter);
    }
  }
  render() {
    return (
      <GoogleMap
        // Do not pass center or defaultCenter props. It is handled manually
        // by the componentWillReceiveProps method
        ref={map => {
          this.map = map;
        }}
        defaultOptions={{
          // center: this.props.center,
          zoom: 19,
          mapTypeId: 'satellite',
          tilt: 0,
          fullscreenControl: true,
          rotateControl: false,
          streetViewControl: false,
          mapTypeControlOptions: {
            position: window.google.maps.ControlPosition.TOP_RIGHT
          }
        }}
      >
        {this.props.children}
      </GoogleMap>
    );
  }
}

const MapWrapper = withGoogleMap(MapWrapperBase);

export class Map extends React.Component {
  render() {
    const { center, children } = this.props;
    return (
      <div id="Map">
        <MapWrapper
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={{ lat: center[1], lng: center[0] }}
        >
          {children}
        </MapWrapper>
      </div>
    );
  }
}

class App extends Component {
  state = {
    view: 1
  }
  handleClick = () => {
    if (this.state.view === 1) {
      this.setState({ view: 2 });
    } else {
      this.setState({ view: 1 })
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.view === 1 && (
          <Map
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            center = {
              [150.644 ,- 34.397]
            }
          />
        )}
        {this.state.view === 2 && (
          <Map
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            center={[150.644, - 34.397]}
          />
        )}
        <button onClick={this.handleClick} style={{
          padding: 20,
          backgroundColor: '#eee'
        }}>Switch Maps</button>
        <p>Now view map {this.state.view}</p>
        <br/>
        <p>Click Switch Maps button to see how the next mount of the map does not work as expected.</p>
        <br/>
        <p>I am not sure if this is specifically a react-google-maps bug, but this suddenly broke this past week (11/8/18). After some hunting I realized I had not specified a version in the google maps api query string, which means "latest". If I specify "3.33" instead of none or the latest "3.34", the code works. But it breaks on latest. See the public/index.html and drop the version down to "3.33" to see this code work.</p>
      </div>
    );
  }
}

export default App;
