import 'aframe';
import 'aframe-look-at-component';
import {Entity, Scene} from 'aframe-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Camera from './Camera';
import Sky from './Sky';
import Videosphere from './Videosphere';
import ElementPlane from './ElementPlane';
import NewElement from './NewElement';
import Welcome from './Welcome';

// setting coordinates outside of state because of nature of raycaster updates, which would trigger re-renders every few miliseconds if stored within state
let globalCoordinates = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true,
      settingLocation: false,
      background: false,
      placing: false,
      elements: [],
      selections: {
        type: false,
        url: false,
        text: false,
        styling: false,
        previewable: false
      }
    }
  }

  selectLocation() {
    this.setState({settingLocation: !this.state.settingLocation})
  }

  handleCollision(data) {
    globalCoordinates = data.detail.intersection.point;
  }

  handleVideosphereURL() {
    let url = prompt('Please enter your URL:');
    this.setState({background: url, welcome: false});
  }

  selectElement(type) {
    let newObj = Object.assign({}, this.state.selections);
    if (type === newObj.type) {
      newObj['type'] = false;
      this.setState({selections: newObj})
    } else {
      newObj['type'] = type;
      this.setState({selections: newObj});
    }
  }

  setBackground(url) {
    this.setState({welcome: false, background: url})
  }

  setBackgroundWithComments(url, comments) {
    let newState = Object.assign({}, this.state);
    comments.forEach(comment => newState.elements.push(comment));
    newState.welcome = false;
    newState.background = url;
    this.setState(newState);
  }

  handleText() {
    let text, size, color, format, url, opacity;
    let type = this.state.selections.type;
    if (type === 'text') {
      text = prompt('Please enter your desired text!');
      size = prompt('Enter your desired font size (default: 25):');
      color = prompt('Enter your desired font color (i.e. black):').toLowerCase();
      format = {text: text, previewable: true, type: type, styling: {size: size, color: color}};
    } else {
      url = prompt('Please enter your media URL!');
      size = prompt('Enter your desired media size (default: 5):');
      opacity = prompt('Enter your desired opacity between 0-1 (i.e. 0.5 for 50% opacity:):')
      format = {url: url, previewable: true, type: type, styling: {size: size, opacity: opacity}}
    }
    this.setState({selections: format});
  }

  cancelPreviewable() {
    let newObj = Object.assign({}, this.state.selections);
    newObj['previewable'] = false;
    this.setState({selections: newObj});
  }

  showMenu(coordinates) {
    this.setState({settingLocation: false, placing: true})
  }

  hidePlane() {
    this.setState({placing: false})
  }

  createNewElement() {
    let tempArray = this.state.elements.slice(0);
    let element = Object.assign({coordinates: globalCoordinates}, this.state.selections);
    tempArray.push(element);
    let resetSelections = {type: false, text: false, url: false, styling: false, previewable: false};
    this.setState({elements: tempArray, selections: resetSelections, placing: false});
  }

  renderElements() {
    return (
      this.state.elements.map((element, idx) => {
        return (
          <NewElement key={idx} selections={element}/>
        )
      })
    )
  }

  render() {
    let modifiers = {
      selectElement: this.selectElement.bind(this),
      handleText: this.handleText.bind(this),
      cancelPreviewable: this.cancelPreviewable.bind(this),
      hidePlane: this.hidePlane.bind(this),
      createNewElement: this.createNewElement.bind(this),
      handleVideosphereURL: this.handleVideosphereURL.bind(this),
      setBackground: this.setBackground.bind(this),
      setBackgroundWithComments: this.setBackgroundWithComments.bind(this)
    }

    return (
      <Scene>
        <Camera>
          <a-cursor
            animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
            geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
            material={`color:${this.state.settingLocation? '#FF3D00' : '#61ffff'}; shader: flat`}
            >
          </a-cursor>
        </Camera>


        {this.state.background?
          <Videosphere 
            id='videosphere' 
            src={this.state.background}
          />
          
          :
          <Videosphere
            src='https://ucarecdn.com/65b1d777-9fc7-4a24-864d-9d59fd80eee4/Project24.mp4'
          />
        }
        

        {this.state.welcome? 
          <Welcome
            modifiers={modifiers}
          />

          :
          <Entity>
            <Entity
              id='settingLocationBox'
              geometry={{primitive: 'circle', radius: 0.5}}
              material={{src:  `${this.state.settingLocation ? 'http://i.imgur.com/Di1kXDN.png' : 'http://i.imgur.com/RBauqN6.png'}` , shader: 'flat', side: 'double', opacity: 0.99}}
              position={{x: 0, y: -2, z: -5}}     
              events={{click: this.selectLocation.bind(this)}} 
            />
            <Entity
              id='homeReturn'
              geometry={{primitive: 'circle', radius: 0.33}}
              material={{src:  'http://i.imgur.com/vpVSY1q.png' , shader: 'flat', side: 'double', opacity: 0.99}}
              position={{x: 0, y: -3.33, z: -5}}     
              events={{click: () => this.setState({welcome: true, background: false, elements: []})}} 
            />
          </Entity>
        }


        {this.state.settingLocation? 
          <Entity
            id='hiddenSphere'
            rotation="0 180 0"
            position="0 0 0"
            material={{opacity: '0', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}}
            geometry="height:5;primitive:sphere;radius:10;segmentsRadial:48;thetaLength:360;openEnded:true;thetaStart:0"
            events={{'click': () => this.showMenu(globalCoordinates), 'raycaster-intersected': this.handleCollision}}
          />

          :
          null
        }


        {this.state.placing ?
          <ElementPlane
            position={globalCoordinates}
            selections={this.state.selections}
            modifiers={modifiers}
          />

          :
          null
        }

        {this.renderElements()}
      </Scene>
    )
  }
}

export default App;
