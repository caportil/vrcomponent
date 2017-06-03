import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Camera from './Camera';
import Sky from './Sky';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }
  render() {
    return (
      <Scene>
        <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>
        <Entity primitive='a-sky' src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg"/>
      </Scene>

    );
  }
}

export default App;
