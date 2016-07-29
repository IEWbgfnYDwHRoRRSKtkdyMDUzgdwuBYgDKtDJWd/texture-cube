import THREE from 'three'
import React, {Component} from 'react'
import {Container} from 'flux/utils'
import CabinStore from '../flux/cabin_store'
import Actions from '../flux/actions'
import Post from '../components/post.react'
import Wall from '../components/wall.react'
import settings from '../settings'

/**
 * Calculates the dimensions and the positions of the separate cabin elements,
 * like posts, walls, braces
 *
 * @param      {<Object>}        state   the current state
 * @return     {(Array|Object)}  the configuration.
 */
const getConfig = (state) => {
  let {
    cabinHeight,
    cabinWidth,
    cabinDepth,
    postWidth,
    postDepth,
    wallDepth,
  } = state

  let quaternionRotate = new THREE.Quaternion()
  quaternionRotate.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)

  let wallWidth1 = cabinWidth - postWidth
  let wallWidth2 = cabinDepth - postDepth

  //NOTE: for posts and walls the height and the depth are swapped because of the World rotation!

  return {
    cabin: {
      position: new THREE.Vector3(-cabinWidth / 2, -cabinDepth / 2, cabinHeight / 2),
    },
    post: {
      height: postDepth,
      width: postWidth,
      depth: cabinHeight,
    },
    posts: [
      new THREE.Vector3(),
      new THREE.Vector3(cabinWidth, 0, 0),
      new THREE.Vector3(cabinWidth, cabinDepth, 0),
      new THREE.Vector3(0, cabinDepth, 0),
    ],
    walls: [
      // {// front
      //   quaternion: new THREE.Quaternion(),
      //   height: cabinHeight,
      //   width: cabinWidth - postDepth,
      //   depth: wallDepth,
      //   anisotropy,
      //   texture: wallTexture,
      //   textureRepeat: new THREE.Vector2(cabinWidth / 50, cabinHeight / 50),
      //   position: new THREE.Vector3((cabinWidth / 2), 0, 0),
      // },
      {// back
        quaternion: new THREE.Quaternion(),
        height: wallDepth,
        width: wallWidth1,
        depth: cabinHeight,
        position: new THREE.Vector3((wallWidth1 / 2) + (postWidth / 2), cabinDepth, 0),
      },
      {// left
        quaternion: quaternionRotate,
        height: wallDepth,
        width: wallWidth2,
        depth: cabinHeight,
        position: new THREE.Vector3(0, (wallWidth2 / 2) + (postDepth / 2), 0),
      }, {// right
        quaternion: quaternionRotate,
        height: wallDepth,
        width: wallWidth2,
        depth: cabinHeight,
        position: new THREE.Vector3(cabinWidth, (wallWidth2 / 2) + (postDepth / 2), 0),
      },
    ]
  }
}

/**
 * Constructs the cabin by using the construction elements Post, Wall, Brace
 *
 * @class      LogCabin (name)
 */
class LogCabin extends Component {

  static displayName = 'LogCabin'

  static getStores() {
    return [CabinStore]
  }

  static calculateState(prevState){
    //console.log(prevState)
    return CabinStore.getState()
  }

  constructor() {
    super()
  }

  render() {

    let config = getConfig(this.state)
    let post = config.post
    let posts = []
    let walls = []

    config.posts.forEach((position, i) => {
      posts.push(<Post
        key={`post_${i}`}
        position={position}
        width={post.width}
        height={post.height}
        depth={post.depth}
        textureData={settings.post.textureData}
        loadedImages={settings.loadedImages}
      />)
    })

    config.walls.forEach((wall, i) => {
      walls.push(<Wall
        key={`wall_${i}`}
        position={wall.position}
        width={wall.width}
        height={wall.height}
        depth={wall.depth}
        quaternion={wall.quaternion}
        textureData={settings.wall.textureData}
        loadedImages={settings.loadedImages}
      />)
    })

    return (
      <group position={config.cabin.position}>
        {posts}
        {walls}
      </group>
    )
  }
}

export default Container.create(LogCabin)
