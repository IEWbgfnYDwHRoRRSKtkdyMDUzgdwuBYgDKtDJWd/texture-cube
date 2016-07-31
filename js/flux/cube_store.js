import THREE from 'three'
import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as types from '../flux/action_types'
import settings from '../settings'

/**
 * Store for cube properties
 *
 *  - cubeWidth
 *  - cubeHeight
 *  - cubeDepth
 *
 * @class      CubeStore (name)
 */
class CubeStore extends ReduceStore{

  getInitialState(){
    return {
      cubeWidth: settings.cube.width,
      cubeHeight: settings.cube.height,
      cubeDepth: settings.cube.depth,
      rotationLeft: settings.cube.textureData.left.rotation,
      rotationRight: settings.cube.textureData.right.rotation,
      rotationBottom: settings.cube.textureData.bottom.rotation,
      rotationTop: settings.cube.textureData.top.rotation,
      rotationFront: settings.cube.textureData.front.rotation,
      rotationBack: settings.cube.textureData.back.rotation,
      position: new THREE.Vector3(0, settings.cube.height / 2, 0),
    }
  }

  reduce(state, action) {

    switch(action.type){
      case types.CUBE_WIDTH:
      case types.CUBE_HEIGHT:
      case types.CUBE_DEPTH:
      case types.ROTATION_LEFT:
      case types.ROTATION_RIGHT:
      case types.ROTATION_BOTTOM:
      case types.ROTATION_TOP:
      case types.ROTATION_FRONT:
      case types.ROTATION_BACK:
        state = {
          ...state,
          [action.type]: action.payload.value,
        }
        break

      default:
    }

    let position = new THREE.Vector3(0, state.cubeHeight / 2, 0)

    state = {
      ...state,
      position,
    }

    return state
  }
}

export default new CubeStore(AppDispatcher)
