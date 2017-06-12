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
    let text = prompt('Step one: Please enter your desired text!');
    let styling = prompt('Step two: Please enter your desired formatting in format "size-color-transparency"! (ex. 15-blue-0.75)').split('-');
    let newObj = Object.assign({}, this.state.selections);
    let format;
    if (this.state.selections.type === 'text') {
      format = {
        size: styling[0],
        color: styling[1],
        opacity: styling[2]
      }
    } else {
      format = {
        height: styling[0],
        width: styling[1],
        opacity: styling[2]
      }
    }
    newObj['text'] = text;
    newObj['url'] = text;
    newObj['styling'] = format;
    newObj['previewable'] = true;
    this.setState({selections: newObj});
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
          <NewElement key={idx} selections={element} coordinates={globalCoordinates}/>
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
          src="https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/"
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
          id="toggleBox"
          geometry={{primitive: 'box'}} 
          material={{color: 'red'}} 
          position={{x: 0, y: 0, z: -5}} 
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
