import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity primitive="a-videosphere" src={props.src} rotation="0 180 0" />
);
