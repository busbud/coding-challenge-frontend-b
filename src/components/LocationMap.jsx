import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import styled from 'styled-components';

const Pin = styled.div`
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 2px;
`;

function LocationMap({ lat, lng }) {
  const [viewport, setViewport] = useState({
    zoom: 12
  });

  return (
    <ReactMapGL
      latitude={lat}
      longitude={lng}
      {...viewport}
      width='100%'
      height='100%'
      onViewportChange={setViewport}
    >
      <Marker latitude={lat} longitude={lng}>
        <Pin />
      </Marker>
    </ReactMapGL>
  );
}

export default LocationMap;
