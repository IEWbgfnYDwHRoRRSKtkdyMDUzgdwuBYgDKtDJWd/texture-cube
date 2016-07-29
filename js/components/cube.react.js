import THREE from 'three'
import React, {Component, PropTypes}from 'react'
import {getUVS} from '../util'

const sides = ['right', 'left', 'back', 'front', 'top', 'bottom']

class Box extends Component {

  static displayName = 'Box'

  constructor(props) {
    super(props)
    this.id = THREE.Math.generateUUID()
  }

  componentWillMount(){
    this.createMaterials()
  }

  /**
   * Creates the materials array that will be passed as a prop of the <multiMaterial> element
   */
  createMaterials = function(){
    this.textureData = this.props.textureData
    let loadedImages = this.props.loadedImages

    this.materials = []

    for(let i = 0; i < 6; i++){
      let map
      if(i < 6){
        let data = this.textureData[sides[i]]
        map = new THREE.Texture(loadedImages[data.img].cloneNode(true))
        map.anisotropy = data.anisotropy
        map.wrapT = THREE.RepeatWrapping
        map.wrapS = THREE.RepeatWrapping
        map.needsUpdate = true
        map.key = sides[i]
        this.materials.push(new THREE.MeshBasicMaterial({map}))
      }
    }

  }


  render() {
    // NOTE: height and depth are swapped!
    let {
      cubeWidth: width,
      cubeDepth: height,
      cubeHeight: depth,
      rotationRight,
      rotationLeft,
      rotationBack,
      rotationFront,
      rotationTop,
      rotationBottom,
      position,
    } = this.props.data

    let uvs = getUVS([
      rotationRight,
      rotationLeft,
      rotationBack,
      rotationFront,
      rotationTop,
      rotationBottom,
    ])

    this.materials.forEach(material => {
      //console.log(this.textureData, material.map.key)
      let key = material.map.key
      let unity = this.textureData[key].unity
      let w = width / unity.width
      let h = depth / unity.height
      let d = height / unity.height
      let rotation

      switch(key){
        case 'top':
          rotation = rotationTop
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(w, d)
          }else {
            material.map.repeat = new THREE.Vector2(d, w)
          }
          break

        case 'bottom':
          rotation = rotationBottom
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(w, d)
          }else {
            material.map.repeat = new THREE.Vector2(d, w)
          }
          break


        case 'front':
          rotation = rotationFront
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(w, h)
          }else{
            material.map.repeat = new THREE.Vector2(h, w)
          }
          break


        case 'back':
          rotation = rotationBack
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(w, h)
          }else{
            material.map.repeat = new THREE.Vector2(h, w)
          }
          break


        case 'left':
          rotation = rotationLeft
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(h, d)
          }else{
            material.map.repeat = new THREE.Vector2(d, h)
          }
          break


        case 'right':
          rotation = rotationRight
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(h, d)
          }else{
            material.map.repeat = new THREE.Vector2(d, h)
          }
          break
        default:
          // do nothing
      }
    })

    return (
      <mesh
        name={this.id}
        key={this.id}
        position={position}
      >
        <boxGeometry
          key={THREE.Math.generateUUID()}
          width={width}
          height={height}
          depth={depth}
          faceVertexUvs={uvs}
          dynamic={true}
          //uvsNeedUpdate={true}
        />
        <multiMaterial
          materials={this.materials}
        />
      </mesh>
    )
  }
}

Box.propTypes = {
  dimension: PropTypes.instanceOf(Object),
  position: PropTypes.instanceOf(Object),
  textureData: PropTypes.instanceOf(Object),
  loadedImages: PropTypes.instanceOf(Object),
}

export default Box

