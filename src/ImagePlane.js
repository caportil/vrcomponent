import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-look-at-component';

export default props => (
  <Entity
    look-at='[camera]'
    geometry={{primitive: 'plane', height: props.selections.styling.size, width: props.selections.styling.size}}
    material={{src: props.selections.url, shader: 'flat', side: 'double', opacity: props.selections.styling.opacity}}
    position={props.coordinates}
  />
);
