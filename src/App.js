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

// setting coordinates outside of state because of nature of raycaster updates, which would trigger re-renders every few miliseconds if stored within state
let globalCoordinates = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
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

  handleClick() {
    console.log('Sphere clicked!');
  }

  handleClick2() {
    this.setState({toggle: !this.state.toggle})
    console.log('Box clicked! Current toggle state:', this.state.toggle, 'and current globalCoordinates:', globalCoordinates);
  }

  handleCollide(data) {
    console.log('Collision at:', data)
    globalCoordinates = data.detail.intersection.point;
  }


  selectElement(type) {
    let newObj = Object.assign({}, this.state.selections);
    console.log('Running within selectElement... newObj:', newObj)
    if (type === newObj.type) {
      newObj['type'] = false;
      this.setState({selections: newObj})
    } else {
      newObj['type'] = type;
      this.setState({selections: newObj});
    }
  }

  handleText() {
    console.log('Running handleText...');
    let type = this.state.selections.type;
    if (type === 'text') {
      var text = prompt('Please enter your desired text!');
      var size = prompt('Enter your desired font size (default: 15):');
      var color = prompt('Enter your desired font color (i.e. black):');
      var format = {
        text: text,
        previewable: true,
        type: type,
        styling: {
          size: size,
          color: color
        }
      };
    } else {
      var url = prompt('Please enter your media URL!');
      var size = prompt('Enter your desired media size (default: 5):');
      var opacity = prompt('Enter your desired opacity between 0-1 (i.e. 0.5 for 50% opacity:):')
      var format = {
        url: url,
        previewable: true,
        type: type,
        styling: {
          size: size,
          opacity: opacity
        }
      }
    }
    console.log('Format is currently:', format);
    this.setState({selections: format});
  }

  cancelPreviewable() {
    console.log('Running cancelPreviewable...');
    let newObj = Object.assign({}, this.state.selections);
    newObj['previewable'] = false;
    this.setState({selections: newObj});
  }

  showMenu(coordinates) {
    console.log('Parameters are:', coordinates);
    this.setState({toggle: false, placing: true})
  }

  hidePlane() {
    console.log('Running hidePlane...')
    this.setState({placing: false})
  }

  createNewElement() {
    let tempArray = this.state.elements.slice(0);
    let selections = this.state.selections;
    console.log('Running createNewElement... selections are:', this.state.selections);
    // let formattedStyling = selections.styling.split('-');
    let element = {
      coordinates: globalCoordinates,
      type: selections.type,
      text: selections.text,
      url: selections.url,
      type: selections.type,
      styling: selections.styling
    }
    let resetSelections = {type: false, text: false, url: false, styling: false, previewable: false};
    tempArray.push(element);

    this.setState({elements: tempArray, selections: resetSelections, placing: false});
  }

  renderElements() {
    return (
      this.state.elements.map((element, idx) => {
        // return instance of img, video, or text entity per element
        console.log('Running renderElements... element is:', element, 'and globalCoordinates are:', globalCoordinates)
        return (
          <NewElement key={idx} selections={element}/>
        )
      })
    )
  }

  render() {
    let modifiers = {
      selectElement: this.selectElement.bind(this),
      testLog: this.handleClick.bind(this),
      handleText: this.handleText.bind(this),
      cancelPreviewable: this.cancelPreviewable.bind(this),
      hidePlane: this.hidePlane.bind(this),
      createNewElement: this.createNewElement.bind(this),
    }

    return (
      <Scene>
        <Camera>
          <a-cursor
            animation__click="property: scale; easing: easeOutQuad; startEvents: click; from: 2 2 2; to: 1 1 1; dur: 200"
            geometry="radiusInner:0.02; radiusOuter:0.03; segmentsTheta:64"
            material={`color:${this.state.toggle? '#FF3D00' : '#61ffff'}; shader: flat`}
            >
          </a-cursor>
        </Camera>

        {/*
        <Videosphere 
          id='videosphere' 
          src="https://ucarecdn.com/67b81f96-e769-4620-a57c-2071285f0aed/Project2.mp4"
        />
        */}
        

        
        <Entity primitive='a-sky' src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg"/>
        

        {this.state.toggle? 

          <Entity
            id='hiddenSphere'
            rotation="0 180 0"
            position="0 0 0"
            material={{opacity: '0', shader: 'flat', side: 'double', transparent: 'true', repeat: '-1 1'}}
            geometry="height:5;primitive:sphere;radius:10;segmentsRadial:48;thetaLength:360;openEnded:true;thetaStart:0"
            events={{'click': () => this.showMenu(globalCoordinates), 'raycaster-intersected': this.handleCollide}}
          />

          :

          null
        }

        <Entity
          id='toggleBox'
          geometry={{primitive: 'circle', radius: 0.5}}
          material={{src:  `${this.state.toggle ? 'http://i.imgur.com/Di1kXDN.png' : 'http://i.imgur.com/RBauqN6.png'}` , shader: 'flat', side: 'double', opacity: 0.99}}
          position={{x: 0, y: -2, z: -5}}     
          events={{click: this.handleClick2.bind(this)}} 
        />

        { this.state.placing ?

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
