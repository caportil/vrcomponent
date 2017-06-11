import {Entity} from 'aframe-react';
import 'aframe-look-at-component';
import React from 'react';
import ImagePlane from './ImagePlane';
import VideoPlane from './VideoPlane';
import TextPlane from './TextPlane';

export default props => {
  if (props.selections.type === 'image') {
    return (
      <ImagePlane />
    )
  } else if (props.selections.type === 'video') {
    return (
      <VideoPlane />
    )
  } else {
    return (
      <TextPlane />
    )
  }
}
