import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity position={props.position} rotation={props.rotation}>

    {/* Background Plane */}
    <Entity
      geometry={{primitive: 'plane', height: 5, width: 4}}
      material={{color: 'black'}}
    />

  </Entity>
);
