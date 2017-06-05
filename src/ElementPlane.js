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

    {/* Image Thumbnail */}
    <Entity
      geometry={{primitive: 'plane'}}
      material={{src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/40974-200.png', shader: 'flat', side: 'double', opacity: 1}}
      position={{x: -1.2, y: 0.75, z: 0.05}}
      rotation='0 0 0'
    />

    {/* Text Thumbnail */}
    <Entity
      geometry={{primitive: 'plane'}}
      material={{src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/40974-200.png', shader: 'flat', side: 'double', opacity: 1}}
      position={{x: 0, y: 0.75, z: 0.05}}
      rotation='0 0 0'
    />

    {/* Video Thumbnail */}
    <Entity
      geometry={{primitive: 'plane'}}
      material={{src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/40974-200.png', shader: 'flat', side: 'double', opacity: 1}}
      position={{x: 1.2, y: 0.75, z: 0.05}}
      rotation='0 0 0'
    />

  </Entity>
);
