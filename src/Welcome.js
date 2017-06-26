import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
  return (
    <Entity>
      <Entity
        text={{value: 'Welcome', 
              width: 35,
              opacity: 0.99,
              color: 'white',
              align: 'center'
              }}
        position={{x: 0, y: 2.75, z: -5}}
        rotation='0 0 0'
      />
      <Entity
        text={{value: 'Please enter a 360 video URL:', 
              width: 5,
              opacity: 0.99,
              color: 'white',
              align: 'center'
              }}
        position={{x: 0, y: 1.5, z: -5}}
        rotation='0 0 0'
      />
      <Entity
        geometry={{primitive: 'plane', height: 0.5, width: 4}}
        material={{src:'http://i.imgur.com/T4Rbnrc.png', opacity:  0.99}}
        position={{x: 0, y: 1, z: -5}}
        rotation='0 0 0'
        events={{click: () => props.modifiers.handleVideosphereURL()}}
      />
      <Entity
        text={{value: 'Or choose from the following presets:', 
              width: 5,
              opacity: 0.99,
              color: 'white',
              align: 'center'
              }}
        position={{x: 0, y: 0.35, z: -5}}
        rotation='0 0 0'
      />



      <Entity
        geometry={{primitive: 'plane', height: 3, width: 3}}
        material={{src: 'http://i.imgur.com/I27h28L.png', shader: 'flat', side: 'double', opacity: 1}}
        position={{x: -4, y: -2, z: -5}}
        rotation='0 0 0'
        events={{click: () => props.modifiers.setBackground('https://ucarecdn.com/6eedc9da-5a8a-4065-ae2b-c0d121b764ab/NewMuseumShorter.mp4')}}
      />

      <Entity
        primitve='a-video'
        geometry={{primitive: 'plane', height: 3, width: 3}} 
        material={{src: 'https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/', shader: 'flat', opacity: 1}}
        position={{x: 0, y: -2, z: -5}}
        events={{click: () => props.modifiers.setBackground('https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/')}}
      />

      <Entity
        geometry={{primitive: 'plane', height: 3, width: 3}}
        material={{src: 'http://i.imgur.com/IY3uuI1.png', shader: 'flat', side: 'double', opacity: 1}}
        position={{x: 4, y: -2, z: -5}}
        rotation='0 0 0'
        events={{click: () => {
          let comments = [{
            coordinates: {
              x:0.35356995679296505,
              y:0.9261392777061402,
              z:-9.81714443106963
            },
            styling: {
              opacity: '0.99',
              size: 2
            },
            text: undefined,
            type: 'image',
            url: 'http://i.imgur.com/RfCeg0a.png'
          },
          {
            coordinates: {
              x: 9.635170602238885,
              y: 2.2176201729225147,
              z: -0.4319093668437341
            },
            styling: {
              color: 'white',
              size: '12'
            },
            text: 'Move your arms over here...',
            type: 'text',
            url: undefined
          },
          {
            coordinates: {
            x: 7.250952268263539,
            y: -4.3186272555668355,
            z: -4.800458580913162
            },
            styling: {
              color: 'white',
              size: '10'
            },
            text: '...and VR Octopus follows suit!',
            type: 'text',
            url: undefined
          },
          {
            coordinates: {
              x: -0.03415424616172854,
              y: 5.141521259739953,
              z: -8.538515896332578
            },
            styling: {
              color: 'red',
              size: '35'
            },
            text: 'VR Hackathon',
            type: 'text',
            url: undefined
          },
          {
            coordinates: {
              x: -0.2769573998527156,
              y: 3.370416926230091,
              z: -9.22914349791769
            },
            styling: {
              color: 'red',
              size: '15'
            },
            text: 'Microsoft Reactor, San Francisco CA',
            type: 'text',
            url: undefined
          }];
          let background = 'https://ucarecdn.com/802ef86b-1a66-4ddb-8f2f-bcac629f756a/NewHackaThon3ShorterStill.mp4';
          console.log('Still running within sub component...')
          props.modifiers.setBackgroundWithComments(background, comments);
        }}}
      />


    </Entity>
  )
}
