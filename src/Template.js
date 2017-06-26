import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
  return (
    <Entity 
      events={{click: () => console.log('Test log')}}
    />
  )
}
