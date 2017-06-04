import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Camera from './Camera';
import Sky from './Sky';
import Videosphere from './Videosphere';
import VideoPlane from './VideoPlane';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }
  render() {
    {/*
    return (
      <Scene>
        <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>

        <Videosphere src="https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/"/>
        <VideoPlane 
          geometry={{height: 3, width: 3}}
          position={{x:0, y:0, z:-3}}
          src="https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/" 
        />
      </Scene>
    );
  */}

    return (
      <Scene>
      <Camera>
        <a-cursor
          animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
          geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
          material={"color:#61ffff; shader: flat"}
          >
        </a-cursor>
      </Camera>
        <Entity primitive='a-sky' src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg"/>
        <iframe src="https://www.w3schools.com"></iframe>
      </Scene>
    )
  }
}

export default App;
