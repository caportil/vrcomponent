import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
  let logSelections = () => {
    console.log('Current selections are:', props.selections);
  }

  return (
    <Entity position={props.position} rotation={props.rotation}>

    {/* STEP ONE (Displayed from beginning) */}

      {/* Background Plane */}
      <Entity
        geometry={{primitive: 'plane', height: 7, width: 4}}
        material={{color: 'black'}}
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

      {/* Image Thumbnail */}
      { props.selections.type === 'text' ? 

          <Entity
            geometry={{primitive: 'plane'}}
            material={{src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/40974-200.png', shader: 'flat', side: 'double', opacity: 1}}
            position={{x: -1.2, y: 1.75, z: 0.05}}
            rotation='0 0 0'
            events={{click: props.modifiers.selectElement('image')}}
          />

        : 

          props.selections.type ? 
            
            null

        : 

          <Entity
            geometry={{primitive: 'plane'}}
            material={{src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/40974-200.png', shader: 'flat', side: 'double', opacity: 1}}
            position={{x: -1.2, y: 1.75, z: 0.05}}
            rotation='0 0 0'
            events={{click: props.modifiers.selectElement('image')}}
          />

      }

      {/* Text Thumbnail */}
      <Entity
        geometry={{primitive: 'plane'}}
        material={{src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/40974-200.png', shader: 'flat', side: 'double', opacity: 1}}
        position={{x: 0, y: 1.75, z: 0.05}}
        rotation='0 0 0'
        events={{click: props.modifiers.selectElement('text')}}
      />

      {/* Video Thumbnail */}
      <Entity
        geometry={{primitive: 'plane'}}
        material={{src: 'https://d30y9cdsu7xlg0.cloudfront.net/png/40974-200.png', shader: 'flat', side: 'double', opacity: 1}}
        position={{x: 1.2, y: 1.75, z: 0.05}}
        rotation='0 0 0'
        events={{click: props.modifiers.selectElement('video')}}
      />


    {/* STEP TWO (displayed after user selects element type) */}

      { props.selections.type ?
          
        <Entity>

          {/* "Enter URL/text" element */}
          <Entity
            text={{
              value: 'click to enter text',
              color: 'white',
              width: 8
            }}
            position={{x: 2.6, y: 0.4, z: 0.05}}
            rotation='0 0 0'
          />

          {/* "Clickable Address Bar Temp */}
          <Entity
            geometry={{primitive: 'plane', height: 0.5, width: 3}}
            material={{color: 'blue'}}
            position={{x: 0, y: -0.25, z: 0.05}}
            rotation='0 0 0'
          />

          {/* Instructions for Alert Pop Ups */}
          <Entity
            text={{
              value: '1) enter url/text (make sure link is valid!)\n2) enter desired height + width + opacity',
              color: 'white',
              width: 4
            }}
            position={{x: 0.4, y: -1, z: 0.05}}
            rotation='0 0 0'
          />

        </Entity>

        :

        null

      }

    {/* STEP THREE (displayed when element selections are complete) */}

      { props.selections.previewable ?

        <Entity>
        
          {/* "Preview" element */}
          <Entity
            text={{
              value: 'preview',
              color: 'white',
              width: 8
            }}
            position={{x: 3.325, y: -1.75, z: 0.05}}
            rotation='0 0 0'
          />

          {/* "Clickable Address Bar Temp */}
          <Entity
            geometry={{primitive: 'plane', height: 0.75, width: 1.5}}
            material={{color: 'blue'}}
            position={{x: -0.05, y: -2.5, z: 0.05}}
            rotation='0 0 0'
            events={{click: logSelections}}
          />

        </Entity>

        :

        null

      }



    </Entity>
  )
};
