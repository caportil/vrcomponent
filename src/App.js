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
      welcome: true,
      toggle: false,
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

  handleClick() {
    console.log('Sphere clicked!');
  }

  handleClick2() {
    this.setState({toggle: !this.state.toggle})
    console.log('Box clicked! Current toggle state:', this.state.toggle, ' current globalCoordinates:', globalCoordinates, 'and current selections:', this.state.selections);
  }

  handleCollide(data) {
    console.log('Collision at:', data)
    globalCoordinates = data.detail.intersection.point;
  }

  handleVideosphereURL() {
    console.log('Running handleVideosphereURL...');
    let url = prompt('Please enter your URL:');
    this.setState({background: url, welcome: false});
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
      var color = prompt('Enter your desired font color (i.e. black):').toLowerCase();
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
    console.log('Current elements are:', this.state.elements)
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
              events={{click: () => this.handleVideosphereURL()}}
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
              events={{click: () => this.setState({welcome: false, background: 'https://ucarecdn.com/6eedc9da-5a8a-4065-ae2b-c0d121b764ab/NewMuseumShorter.mp4'})}}
            />

            <Entity
              primitve='a-video'
              geometry={{primitive: 'plane', height: 3, width: 3}} 
              material={{src: 'https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/', shader: 'flat', opacity: 1}}
              position={{x: 0, y: -2, z: -5}}
              events={{click: () => this.setState({welcome: false, background: 'https://ucarecdn.com/bcece0a8-86ce-460e-856b-40dac4875f15/'})}}
            />

            <Entity
              geometry={{primitive: 'plane', height: 3, width: 3}}
              material={{src: 'http://i.imgur.com/IY3uuI1.png', shader: 'flat', side: 'double', opacity: 1}}
              position={{x: 4, y: -2, z: -5}}
              rotation='0 0 0'
              events={{click: () => {
                let newState = Object.assign({}, this.state);
                newState.elements.push({
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
                });
                newState.welcome = false;
                newState.background = 'https://ucarecdn.com/802ef86b-1a66-4ddb-8f2f-bcac629f756a/NewHackaThon3ShorterStill.mp4';
                console.log('Still running within sub component...')
                this.setState(newState);
              }}}
            />


          </Entity>

          :
          null
        }




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

        {this.state.welcome?
          null
          :
          <Entity>
            <Entity
              id='toggleBox'
              geometry={{primitive: 'circle', radius: 0.5}}
              material={{src:  `${this.state.toggle ? 'http://i.imgur.com/Di1kXDN.png' : 'http://i.imgur.com/RBauqN6.png'}` , shader: 'flat', side: 'double', opacity: 0.99}}
              position={{x: 0, y: -2, z: -5}}     
              events={{click: this.handleClick2.bind(this)}} 
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
