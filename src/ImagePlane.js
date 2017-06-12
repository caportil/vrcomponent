import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-look-at-component';

export default props => (
  <Entity
    look-at='[camera]'
    geometry={{primitive: 'plane', height: props.selections.styling.height, width: props.selections.styling.width}}
    material={{src: props.selections.url, shader: 'flat', side: 'double', opacity: props.selections.styling.opacity}}
    position={props.coordinates}
  />
);
