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
      toggle: false
    }
  }

  handleClick() {
    console.log('Sphere clicked!');
  }

  handleClick2() {
    this.setState({toggle: !this.state.toggle})
    console.log('Box clicked! Current toggle state:', this.state.toggle);
  }

  handleCollide(data) {
    console.log('Collision at:', data)
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

        <Entity primitive='a-sky' src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg" />
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

        <Videosphere id='videosphere' src="https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/"/>


        {this.state.toggle? 

          <Entity
            id='hiddenSphere'
            rotation="0 180 0"
            position="0 0 0"
            material={{opacity: '0', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}}
            geometry="height:5;primitive:sphere;radius:7.5;segmentsRadial:48;thetaLength:360;openEnded:true;thetaStart:0"
            events={{'raycaster-intersected': this.handleCollide, 'click': this.handleClick}}
          />

          :

          null
        }

        <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}} events={{click: this.handleClick2.bind(this)}} />

      </Scene>
    )
  }
}

export default App;
