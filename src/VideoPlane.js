import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-look-at-component';

export default props => (
  <Entity
    look-at='[camera]'
    primitve='a-video'
    geometry={{height: props.selections.styling.size, width: props.selections.styling.size, }} 
    material={{src: props.selections.url, shader: 'flat', opacity: props.selections.styling.opacity}}
    position={props.coordinates}
  />
);
