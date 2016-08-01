import THREE from 'three'
import React, {Component, PropTypes}from 'react'
import {getCubeGeometryUVs} from '../util'

const sides = [
  'right',
  'left',
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
    let textureData = this.props.textureData
    let loadedImages = this.props.loadedImages

    this.materials = []
    this.unityValues = []

    for(let i = 0; i < 6; i++){
      let map
      if(i < 6){
        let data = textureData[sides[i]]
        map = new THREE.Texture(loadedImages[data.img].cloneNode(true))
        map.anisotropy = data.anisotropy
        map.wrapT = THREE.RepeatWrapping
        map.wrapS = THREE.RepeatWrapping
        map.needsUpdate = true
        this.materials.push(new THREE.MeshBasicMaterial({map}))
        this.unityValues.push(textureData[sides[i]].unity)
      }
    }

  }


  render() {

    let {
      cubeWidth: width,
      cubeDepth: depth,
      cubeHeight: height,
      rotationRight,
      rotationLeft,
      rotationTop,
      rotationBottom,
      rotationFront,
      rotationBack,
      position,
    } = this.props.data


    let rotations = [
      rotationRight,
      rotationLeft,
      rotationTop,
      rotationBottom,
      rotationFront,
      rotationBack,
    ]

    let uvs = getCubeGeometryUVs(rotations, this.unityValues, width, height, depth)


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

