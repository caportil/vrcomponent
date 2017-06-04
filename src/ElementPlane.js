import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity position={props.position} rotation={props.rotation}>

    {/* Background Plane */}
    <Entity
      geometry={{primitive: 'plane', height: 5, width: 4}}
      material={{color: 'black'}}
    />

    {/* Header */}
    <Entity
      text={{
        value: 'select element type',
        color: 'white',
        width: 8
      }}
      position={{x: 2.5, y: 1.70, z: 0.25}}
      rotation='0 0 0'
    />

  </Entity>
);
