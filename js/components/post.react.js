import THREE from 'three'
import React, {Component, PropTypes}from 'react'
import {getUVS} from '../util'

let index = 0

/**
 * Post React component
 *
 * @class      Post
 */
class Post extends Component {

  static displayName = 'Post'

  constructor(props) {
    super(props)
    this.id = `Post_${index++}`
    this.uvs = getUVS([
      0, // right
      0, // left
      90, // back
      -90, // front
      0, // bottom
      0, // top
    ])
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

    for(let i = 0; i < 6; i++){
      let map
      if(i < 4){
        map = new THREE.Texture(loadedImages[textureData.side.img].cloneNode(true))
        map.anisotropy = textureData.side.anisotropy
        map.wrapT = THREE.MirroredRepeatWrapping
        map.wrapS = THREE.MirroredRepeatWrapping
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
    let {
      width,
      height,
      depth,
    } = this.props.dimensions

    console.log(width, height, depth)

    // NOTE: height and depth are swapped!

    this.materials.forEach((material, i) => {
      if(i < 2){
        // left and right side
        material.map.repeat = new THREE.Vector2(height / this.textureSideUnity.width, depth / this.textureSideUnity.height)
      }else if(i < 4){
        // front and back
        material.map.repeat = new THREE.Vector2(width / this.textureSideUnity.width, depth / this.textureSideUnity.height)
      }else{
        // top and bottom
        //material.map.repeat = new THREE.Vector2(1, 1) // -> to fill (and stretch entire square) -> same as ClampToEdgeWrapping
        material.map.repeat = new THREE.Vector2(width / this.textureTopUnity.width, height / this.textureTopUnity.height)
      }
    })


    return (
      <mesh
        name={this.id}
        key={THREE.Math.generateUUID()}
        position={this.props.position}
      >
        <boxGeometry
          width={width}
          height={height}
          depth={depth}
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

Post.propTypes = {
  dimension: PropTypes.s.instanceOf(Object),
  position: PropTypes.instanceOf(Object),
  textureData: PropTypes.instanceOf(Object),
  loadedImages: PropTypes.instanceOf(Object),
}

export default Post

