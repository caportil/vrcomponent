import {Entity} from 'aframe-react';
import React from 'react';
import ImagePlane from './ImagePlane';
import VideoPlane from './VideoPlane';
import TextPlane from './TextPlane';

export default props => {
  if (props.selections.type === 'image') {
    return (
      <ImagePlane
        selections={props.selections}
        coordinates={props.selections.coordinates}
      />
    )
  } else if (props.selections.type === 'video') {
    return (
      <VideoPlane 
        selections={props.selections}
        coordinates={props.selections.coordinates}
      />
    )
  } else {
    return (
      <TextPlane 
        selections={props.selections}
        coordinates={props.selections.coordinates}
      />
    )
  }
}
