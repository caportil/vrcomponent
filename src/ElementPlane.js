import {Entity} from 'aframe-react';
import 'aframe-look-at-component';
import React from 'react';

export default props => {
  let logSelections = () => {
    console.log('Current selections are:', props.selections);
  }

  let adjustCoordinates = (coordinates) => {
    let tx = coordinates['x'];
    let tz = coordinates['z'];
    let s = Math.abs(tx/ tz); // s = slope
    let modifier = 7; // increase to push "select element type" plane further away, decrease to bring closer
    let z = 7 / (Math.sqrt(Math.pow(s, 2) + 1));
    let x = s*z;
    x = Math.sign(tx) * x;
    z = Math.sign(tz) * z;
    return `${x.toString()} 0.5 ${z.toString()}`
  }

  let calculateYaw = (coordinates) => {
    let x = coordinates['x'];
    let z = coordinates['z'];
    if (z <= 0 && x <= 0){
      return `${90 - Math.abs(Math.atan(z/x) * (180/Math.PI))}`
    }
    if (z >= 0 && x >= 0) {
      return `${-90 - Math.abs(Math.atan(z/x) * (180/Math.PI))}`
    }
    if (z >= 0 && x <= 0){
      return `${90 + Math.abs(Math.atan(z/x) * (180/Math.PI))}`
    }
    if (z <= 0 && x >= 0) {
      return `${Math.abs(Math.atan(z/x) * (180/Math.PI)) - 90}`
    }
  }

  return (
    <Entity 
      position={`${adjustCoordinates(props.position)}`} 
      rotation={`0 ${calculateYaw(props.position)} 0`}
    >

    {/* STEP ONE (Displayed from beginning) */}

      {/* Background Plane */}
      <Entity
        geometry={{primitive: 'plane', height: 7, width: 4}}
        material={{color: 'black', opacity: 0.5}}
      />

      {/* Header */}
      <Entity
        text={{
          value: 'select element type',
          color: 'white',
          width: 8
        }}
        position={{x: 2.45, y: 2.70, z: 0.25}}
        rotation='0 0 0'
      />


      {/* Close Button */}
        <Entity
          geometry={{primitive: 'plane'}}
          material={{src: 'https://cdn3.iconfinder.com/data/icons/interface/100/close_button_1-512.png', height: 1, width: 1, shader: 'flat', side: 'double', opacity: 0.99}}
          position={{x: 2.5, y: 3.5, z: 0.05}}
          rotation='0 0 0'
          events={{click: () => props.modifiers.hidePlane()}}
        />

      {/* Image Thumbnail */}
        <Entity
          geometry={{primitive: 'plane'}}
          material={{src: 'http://i.imgur.com/wqsK2ON.png', shader: 'flat', side: 'double', opacity: `${props.selections.type === 'image' || !props.selections.type ? 0.99 : 0.5}`}}
          position={{x: -1.2, y: 1.75, z: 0.05}}
          rotation='0 0 0'
          events={{click: () => props.modifiers.selectElement('image')}}
        />

      {/* Text Thumbnail */}
      <Entity
        geometry={{primitive: 'plane'}}
        material={{src: 'https://cdn1.iconfinder.com/data/icons/communication-and-navigation/16/Icon_bubble_three_dots-512.png', shader: 'flat', side: 'double', opacity: `${props.selections.type === 'text' || !props.selections.type ? 0.99 : 0.5}`}}
        position={{x: 0, y: 1.75, z: 0.05}}
        rotation='0 0 0'
        events={{click: () => props.modifiers.selectElement('text')}}
      />

      {/* Video Thumbnail */}
      <Entity
        geometry={{primitive: 'plane'}}
        material={{src: 'http://i.imgur.com/npuJPyC.png', shader: 'flat', side: 'double', opacity: `${props.selections.type === 'video' || !props.selections.type ? 0.99 : 0.5}`}}
        position={{x: 1.2, y: 1.75, z: 0.05}}
        rotation='0 0 0'
        events={{click: () => props.modifiers.selectElement('video')}}
      />






    {/* STEP TWO (displayed after user selects element type) */}

      { props.selections.type ?
          
        <Entity>

          {/* "Enter URL/text" element */}
          <Entity
            text={{
              value: `click to enter ${props.selections.type === 'text' ? 'text' : 'URL'}`,
              color: 'white',
              width: 8,
              opacity: `${props.selections.previewable ? 0.5 : 1}`
            }}
            position={{x: 2.6, y: 0.4, z: 0.15}}
            rotation='0 0 0'
          />

          {/* "Clickable Address Bar Temp */}
          <Entity
            geometry={{primitive: 'plane', height: 0.5, width: 3}}
            material={{src:'http://i.imgur.com/T4Rbnrc.png', opacity: `${props.selections.previewable ? 0.5 : 0.99}`}}
            position={{x: 0, y: -0.25, z: 0.15}}
            rotation='0 0 0'
            events={{click: () => props.modifiers.handleText()}}
          />

          {/* Instructions for Alert Pop Ups */}
          <Entity
            text={{
              value: `${props.selections.type === 'text' ? '1) enter desired text on first prompt\n2) enter desired size + color + transparency' : '1) enter media link/URL on first prompt\n2) enter desired height + width + opacity'}`,
              color: 'white',
              width: 4,
              opacity: `${props.selections.previewable ? 0.5 : 1}`
            }}
            position={{x: 0.4, y: -1, z: 0.15}}
            rotation='0 0 0'
          />

        </Entity>

        :

        null

      }

    {/* STEP THREE (displayed when element selections are complete) */}

      <Entity>
      
        {/* "Preview" element */}
        <Entity
          text={{
            value: 'preview',
            color: 'white',
            width: 8,
            opacity: `${props.selections.previewable ? 1 : 0.5}`
          }}
          position={{x: 3.325, y: -1.75, z: 0.05}}
          rotation='0 0 0'
        />

        {/* "Clickable Preview Temp */}
        <Entity
          geometry={{primitive: 'plane', height: 0.75, width: 1.5}}
          material={{color: 'blue', opacity: `${props.selections.previewable ? 1 : 0.5}`}}
          position={{x: -0.05, y: -2.5, z: 0.05}}
          rotation='0 0 0'
          events={{click: props.modifiers.createNewElement}}
        />

      </Entity>

    {/* "Cancel" element */}
    <Entity
      events={{click: props.modifiers.cancelPreviewable}}
    >
      <Entity
        geometry={{primitive: 'plane', height: 0.5, width: 0.75}}
        material={{color: 'red', opacity: 0}}
        position={{x: 0, y: -3.25, z: 0.025}}
        rotation='0 0 0'
      />

      <Entity
        text={{
          value: `${props.selections.previewable ? '(back)' : ''}`,
          color: 'white',
          width: 5,
          opacity: `${props.selections.previewable ? 1 : 0.5}`
        }}
        position={{x: 2.1, y: -3.15, z: 0.05}}
        rotation='0 0 0'
        events={{click: () => console.log('back text clicked!')}}
      />
    </Entity>


    </Entity>
  )
};
