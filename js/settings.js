import THREE from 'three'
import * as types from './flux/action_types'

/**
 * Object that stores all initial and runtime settings that are used by several
 * classes and functions
 */
export default{

  displayState: 'loading',
  message: 'loading...',

  textureBaseUrl: './img/',
  /**
   * An array containing all images used in the application; used for preloading
   * the images before the first scene graph render so as to avoid a flash of a
   * texture-less scene.
   */
  textureImages: ['front.jpg', 'back.jpg', 'top.jpg', 'bottom.jpg', 'left.jpg', 'right.jpg'],
  /**
   * Once the texture images are loaded, the Image instances are stored in this
   * object. The name of the texture image is used as key.
   */
  loadedImages: {},

  world: {
    quaternion: new THREE.Quaternion(),
    position: new THREE.Vector3(0, 0, 0),
  },

  camera: {
    quaternion: new THREE.Quaternion(),
    position: new THREE.Vector3(0, 300, 500),
  },

  scene: {
    quaternion: new THREE.Quaternion(),
    width: window.innerWidth,
    height: window.innerHeight,
    autoRender: false,
  },

  rotation: {
    min: -180,
    max: 180,
    step: 90,
  },

  cube: {
    width: 100,
    depth: 100,
    height: 100,
    min: {
      width: 10,
      depth: 10,
      height: 10,
    },
    max: {
      width: 500,
      depth: 500,
      height: 500,
    },
    textureData: {
      front: {
        img: 'front.jpg',
        anisotropy: 16,
        rotation: 0,
        unity: {
          width: 50,
          height: 50,
        },
      },
      back: {
        img: 'back.jpg',
        anisotropy: 16,
        rotation: 0,
        unity: {
          width: 50,
          height: 50,
        },
      },
      top: {
        img: 'top.jpg',
        anisotropy: 16,
        rotation: 0,
        unity: {
          width: 50,
          height: 50,
        },
      },
      bottom: {
        img: 'bottom.jpg',
        anisotropy: 16,
        rotation: 0,
        unity: {
          width: 50,
          height: 50,
        },
      },
      left: {
        img: 'left.jpg',
        anisotropy: 16,
        rotation: 0,
        unity: {
          width: 50,
          height: 50,
        },
      },
      right: {
        img: 'right.jpg',
        anisotropy: 16,
        rotation: 0,
        unity: {
          width: 50,
          height: 50,
        },
      },
    },
  },


  get sliders () {
    return [{
      type: types.CUBE_HEIGHT,
      label: 'cube height: ',
      min: this.cube.min.height,
      max: this.cube.max.height,
      value: this.cube.height,
    }, {
      type: types.CUBE_WIDTH,
      label: 'cube width: ',
      min: this.cube.min.width,
      max: this.cube.max.width,
      value: this.cube.width,
    }, {
      type: types.CUBE_DEPTH,
      label: 'cube depth: ',
      min: this.cube.min.depth,
      max: this.cube.max.depth,
      value: this.cube.depth,
    }, {
      type: types.ROTATION_LEFT,
      label: 'rotation left: ',
      min: this.rotation.min,
      max: this.rotation.max,
      step: this.rotation.step,
      value: this.cube.textureData.left.rotation,
    }, {
      type: types.ROTATION_RIGHT,
      label: 'rotation right: ',
      min: this.rotation.min,
      max: this.rotation.max,
      step: this.rotation.step,
      value: this.cube.textureData.right.rotation,
    }, {
      type: types.ROTATION_FRONT,
      label: 'rotation front: ',
      min: this.rotation.min,
      max: this.rotation.max,
      step: this.rotation.step,
      value: this.cube.textureData.front.rotation,
    }, {
      type: types.ROTATION_BACK,
      label: 'rotation back: ',
      min: this.rotation.min,
      max: this.rotation.max,
      step: this.rotation.step,
      value: this.cube.textureData.back.rotation,
    }, {
      type: types.ROTATION_TOP,
      label: 'rotation top: ',
      min: this.rotation.min,
      max: this.rotation.max,
      step: this.rotation.step,
      value: this.cube.textureData.top.rotation,
    }, {
      type: types.ROTATION_BOTTOM,
      label: 'rotation bottom: ',
      min: this.rotation.min,
      max: this.rotation.max,
      step: this.rotation.step,
      value: this.cube.textureData.bottom.rotation,
    }]
  },
}
