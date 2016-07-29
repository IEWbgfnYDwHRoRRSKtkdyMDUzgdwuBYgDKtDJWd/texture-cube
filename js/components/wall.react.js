import THREE from 'three'
import React, {Component, PropTypes}from 'react'
import {getUVS} from '../util'

let index = 0

/**
 * Wall React component
 *
 * @class      Wall
 */
class Wall extends Component {

  static displayName = 'Wall'

  constructor(props) {
    super(props)
    this.id = `Wall_${index++}`
    this.uvs = getUVS([
      -90, // right
      -90, // left
      -90, // back
      -90, // front
      -90, // bottom
      -90, // top
    ])
  }

  componentWillMount(){
    this.createMaterials()
  }


  /**
   * Creates the materials array that will be passed as a prop of the
   * <multiMaterial> element
   */
  createMaterials = function(){
    let textureData = this.props.textureData
    let loadedImages = this.props.loadedImages

    this.materials = []

    for(let i = 0; i < 6; i++){
      let map
      if(i < 4){
        map = new THREE.Texture(loadedImages[textureData.side.img].cloneNode(true))
        map.anisotropy = textureData.side.anisotropy
        map.wrapT = THREE.RepeatWrapping
        map.wrapS = THREE.RepeatWrapping
        map.needsUpdate = true
        this.materials.push(new THREE.MeshBasicMaterial({map}))
      }else {
        map = new THREE.Texture(loadedImages[textureData.top.img].cloneNode(true))
        map.anisotropy = textureData.top.anisotropy
        map.wrapT = THREE.RepeatWrapping
        map.wrapS = THREE.RepeatWrapping
        map.needsUpdate = true
        this.materials.push(new THREE.MeshBasicMaterial({map}))
      }
    }

    this.textureSideUnity = textureData.side.unity
    this.textureTopUnity = textureData.top.unity
  }


  render() {

    // NOTE: height and depth are swapped!

    this.materials.forEach((material, i) => {
      if(i < 2){
        // left and right side
        material.map.repeat = new THREE.Vector2(this.props.height / this.textureSideUnity.width, this.props.depth / this.textureSideUnity.height)
      }else if(i < 4){
        // front and back
        material.map.repeat = new THREE.Vector2(this.props.width / this.textureSideUnity.width, this.props.depth / this.textureSideUnity.height)
      }else{
        // top and bottom
        material.map.repeat = new THREE.Vector2(this.props.width / this.textureTopUnity.width, this.props.height / this.textureTopUnity.height)
      }
    })

    return (
      <mesh
        key={THREE.Math.generateUUID()}
        position={this.props.position}
        quaternion={this.props.quaternion}
      >
        <boxGeometry
          width={this.props.width}
          height={this.props.height}
          depth={this.props.depth}
          faceVertexUvs={this.uvs}
          //uvsNeedUpdate={true}
        />
        <multiMaterial
          materials={this.materials}
        />
      </mesh>
    )
  }
}

Wall.propTypes = {
  depth: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  position: PropTypes.instanceOf(Object),
  quaternion: PropTypes.instanceOf(THREE.Quaternion),
  textureData: PropTypes.instanceOf(Object),
  loadedImages: PropTypes.instanceOf(Object),
}

export default Wall


/*
      <group>
        <resources>
            <texture
              resourceId={this.id}
              url={this.props.texture}
              wrapS={THREE.RepeatWrapping}
              wrapT={THREE.RepeatWrapping}
              anisotropy={this.props.anisotropy}
              repeat={this.props.textureRepeat}
            />
        </resources>

        <mesh
          ref={this.id}
          key={THREE.Math.generateUUID()}
          position={this.props.position}
          quaternion={this.props.quaternion}
        >
          <boxGeometry
            width={this.props.width}
            height={this.props.depth}
            depth={this.props.height}
            faceVertexUvs={this.uvs}
            //uvsNeedUpdate={true}
          />
          <meshBasicMaterial>
            <textureResource resourceId={this.id} />
          </meshBasicMaterial>
        </mesh>
      </group>

*/

