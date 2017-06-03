import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity geometry={props.geometry} primitive="a-video" src={props.src} position={props.position}/>
);
