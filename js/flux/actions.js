import AppDispatcher from './app_dispatcher'
import {loadImages} from '../util'
import settings from '../settings'
import * as ActionTypes from '../flux/action_types'


export default {

  /**
   * Loads texture images, stores them in the settings object, then dispatches an
   * event that tells the Threejs scene graph to do its initial render and we
   * can see the actual 3D scene.
   */
  load(){
    AppDispatcher.dispatch({
      type: ActionTypes.LOAD,
      payload: {
        value: 'loading textures',
      }
    })

    let {textureBaseUrl, textureImages} = settings
    /**
     * Store images in settings object so every module has access to them
     */
    loadImages(textureBaseUrl, textureImages)
    .then(images => {
      settings.loadedImages = {...images}
      AppDispatcher.dispatch({
        type: ActionTypes.TEXTURES_LOADED,
      })
    })
  },

  /**
   * change render method: manual or on rAF
   */
  changeRenderMethod(){
    AppDispatcher.dispatch({
      type: ActionTypes.CHANGE_RENDER_METHOD,
    })
  },

  // currently not in use
  setSliderBusy(e) {
    AppDispatcher.dispatch({
      type: ActionTypes.SLIDER_BUSY,
      payload: {
        value: e.nativeEvent.type === 'mousedown'
      }
    })
  },


  sliderChange(e) {
    e = e.nativeEvent
    AppDispatcher.dispatch({
      type: e.target.id,
      payload: {
        value: e.target.valueAsNumber
      }
    })
  },


  updateCamera(e){
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_CAMERA,
      payload: {
        position: e.position,
        quaternion: e.quaternion
      }
    })
  },


  resize(e){
    AppDispatcher.dispatch({
      type: ActionTypes.RESIZE,
      payload: {
        width: e.width,
        height: e.height
      }
    })
  },
}


