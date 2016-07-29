import THREE from 'three'
import React, {Component} from 'react'
import {Container} from 'flux/utils'
import ReactDOM from 'react-dom'
import React3 from 'react-three-renderer'
import SceneStore from '../flux/scene_store'
import Actions from '../flux/actions'
import OrbitControls from '../../lib/OrbitControls'


/* scene graph */

class Scene3D extends Component {

  static displayName = 'Scene3D'

  static getStores() {
    return [SceneStore]
  }

  static calculateState(){
    return SceneStore.getState()
  }


  constructor(props) {
    super(props)
    this._mouseUpListener = this._onMouseUp.bind(this)
    this._orbitControlsHandler = this._onControllerChange.bind(this)
    this._renderTrigger = function(){
      console.log('render trigger dummy')
    }
    this._onManualRenderTriggerCreated = (renderTrigger) => {
      this._renderTrigger = renderTrigger
    }
    this.onResizeListener = this._onResize.bind(this)
    window.addEventListener('resize', this.onResizeListener)
  }


  componentDidMount(){
    this._canvas = ReactDOM.findDOMNode(this.refs.react3)
    this._camera = this.refs.camera
    this._orbitControls = new THREE.OrbitControls(this._camera, this._canvas)
    this._init()
  }


  componentWillUnmount(){
    this._orbitControls.removeEventListener('change', this._orbitControlsHandler, false)
    this._canvas.removeEventListener('mouseup', this._mouseUpListener, false)
    this._orbitControls.dispose()
    window.removeEventListener('resize', this.onResizeListener)
  }


  _init(){
    this._canvas.removeEventListener('mouseup', this._mouseUpListener, false)
    this._orbitControls.removeEventListener('change', this._orbitControlsHandler, false)

    if(this.state.autoRender === false){
      this._orbitControls.addEventListener('change', this._orbitControlsHandler, false)
      this._renderTrigger()
    }else{
      this._canvas.addEventListener('mouseup', this._mouseUpListener, false)
    }
  }


  _onResize(){
    Actions.resize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }


  _onMouseUp(){
    Actions.updateCamera({
      position: this._camera.position,
      quaternion: this._camera.quaternion
    })
  }


  _onControllerChange(){
    Actions.updateCamera({
      position: this._camera.position,
      quaternion: this._camera.quaternion
    })
  }


  render() {

    if(this.state.changeAutoRender === true){
      this._init()
    }

    let scene = (
      <React3
        ref="react3"
        mainCamera="camera"
        width={this.state.sceneWidth}
        height={this.state.sceneHeight}
        antialias
        shadowMapEnabled={true}
        clearColor={0xffffff}
        forceManualRender={!this.state.autoRender}
        onManualRenderTriggerCreated={this._onManualRenderTriggerCreated}
      >
        <scene
          ref="scene"
        >
          <perspectiveCamera
            ref="camera"
            name="camera"
            fov={50}
            aspect={this.state.sceneWidth / this.state.sceneHeight}
            near={1}
            far={1000}
            position={this.state.cameraPosition}
            quaternion={this.state.cameraRotation}
          />

          <ambientLight
            color={new THREE.Color(0x333333)}
          />

          <directionalLight
            color={new THREE.Color(0xFFFFFF)}
            intensity={1}
            position={new THREE.Vector3(500, 500, 500)}
          />

          {this.props.children}

        </scene>
      </React3>
    )
    //console.log('render', this.props.autoRender)
    if(this.state.autoRender === false){
      this._renderTrigger()
    }
    return scene
  }
}


export default Container.create(Scene3D)

