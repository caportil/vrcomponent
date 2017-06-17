import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-look-at-component';

export default props => (
  <Entity
    look-at='[camera]'
    text={{
      value: props.selections.text,
      color: props.selections.styling.color,
      width: props.selections.styling.size,
      align: 'center'
    }}
    position={props.coordinates}
  />
);
