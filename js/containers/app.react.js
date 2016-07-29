import React, {Component}from 'react'
import {Container} from 'flux/utils'
import Scene3D from './scene.react'
import Cube from '../components/cube.react'
import Controls from '../components/controls.react'
import World from '../components/world.react'
import Stats from '../components/stats.react'
import Actions from '../flux/actions'
import CabinStore from '../flux/cabin_store'
import SceneStore from '../flux/scene_store'
import settings from '../settings'
import {getRandomColor} from '../util'

/**
 * Main React entry point
 *
 * @class      App (name)
 */
class App extends Component{

  static displayName = 'App'

  static getStores() {
    return [SceneStore, CabinStore]
  }

  static calculateState(){
    return {
      scene: SceneStore.getState(),
      cube: CabinStore.getState(),
    }
  }

  constructor(props){
    super(props)
    getRandomColor()
  }

  componentDidMount() {
    Actions.load()
  }

  render() {

    if(this.state.scene.displayState === 'initializing'){
      return <div>{this.state.scene.message}</div>
    }


    return (
      <div>
        <Controls
          autoRender={this.state.scene.autoRender}
          onClick={Actions.changeRenderMethod}
          onChange={Actions.sliderChange}
          sliders={settings.sliders}
          sliderValues={this.state.cube}
        />
        <Scene3D>
          <World
            position={settings.world.position}
            quaternion={settings.world.quaternion}
          >
            <Cube
              data={this.state.cube}
              textureData={settings.cube.textureData}
              loadedImages={settings.loadedImages}
            />
          </World>
        </Scene3D>
        <Stats/>
      </div>
    )
  }
}

export default Container.create(App)

