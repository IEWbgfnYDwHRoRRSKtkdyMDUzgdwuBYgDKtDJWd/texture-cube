import THREE from 'three'
import React, {Component, PropTypes}from 'react'
import {getUVS} from '../util'

const sides = [
  'left',
  'right',
  'top',
  'bottom',
  'front',
  'back',
]

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

    let {
      cubeWidth: width,
      cubeDepth: depth,
      cubeHeight: height,
      rotationLeft,
      rotationRight,
      rotationTop,
      rotationBottom,
      rotationFront,
      rotationBack,
      position,
    } = this.props.data

    let uvs = getUVS([
      rotationLeft,
      rotationRight,
      rotationTop,
      rotationBottom,
      rotationFront,
      rotationBack,
    ])

    this.materials.forEach(material => {
      //console.log(this.textureData, material.map.key)
      let key = material.map.key
      let unity = this.textureData[key].unity
      let x = width / unity.width
      let y = height / unity.height
      let z = depth / unity.width
      let rotation

      switch(key){
        case 'left':
          rotation = rotationLeft
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(y, z)
          }else{
            material.map.repeat = new THREE.Vector2(z, y)
          }
          break


        case 'right':
          rotation = rotationRight
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(y, z)
          }else{
            material.map.repeat = new THREE.Vector2(z, y)
          }
          break


        case 'top':
          rotation = rotationTop
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(z, x)
          }else {
            material.map.repeat = new THREE.Vector2(x, z)
          }
          break

        case 'bottom':
          rotation = rotationBottom
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(z, x)
          }else {
            material.map.repeat = new THREE.Vector2(x, z)
          }
          break


        case 'front':
          rotation = rotationFront
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(y, x)
          }else{
            material.map.repeat = new THREE.Vector2(x, y)
          }
          break


        case 'back':
          rotation = rotationBack
          if(rotation === 90 || rotation === -90){
            material.map.repeat = new THREE.Vector2(y, x)
          }else{
            material.map.repeat = new THREE.Vector2(x, y)
          }
          break


        default:
          // let's go for a walk in the woods
      }
    })

    return (
      <mesh
        name={this.id}
        key={this.id}
        position={position}
      >
        <boxGeometry
          ref={'geometry'}
          key={THREE.Math.generateUUID()}
          width={width}
          height={height}
          depth={depth}
          faceVertexUvs={uvs}
          //dynamic={true}
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

