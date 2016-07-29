import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as types from '../flux/action_types'
import settings from '../settings'

/**
 * Store for all properties concerning the rendering of the Threejs scene graph.
 *
 * @class      SceneStore (name)
 */
class SceneStore extends ReduceStore{

  getInitialState(){
    return {
      cameraPosition: settings.camera.position,
      cameraRotation: settings.camera.quaternion,
      sceneRotation: settings.scene.quaternion,
      sceneWidth: settings.scene.width,
      sceneHeight: settings.scene.height,
      autoRender: settings.scene.autoRender,
      changeAutoRender: false,
      displayState: 'initializing',
    }
  }

  reduce(state, action) {

    switch(action.type){

      case types.LOAD:
        return {
          ...state,
          message: action.payload.value,
        }

      case types.TEXTURES_LOADED:
        return {
          ...state,
          displayState: 'loaded',
          message: '',
        }

      case types.CHANGE_RENDER_METHOD:
        return {
          ...state,
          autoRender: !state.autoRender,
          changeAutoRender: true,
        }

      case types.RESIZE:
        return {
          ...state,
          sceneWidth: action.payload.width,
          sceneHeight: action.payload.height,
        }

      case types.UPDATE_CAMERA:
        return {
          ...state,
          cameraPosition: action.payload.position,
          cameraQuaternion: action.payload.quaternion,
        }


      default:
        return state

    }
  }
}

export default new SceneStore(AppDispatcher)
