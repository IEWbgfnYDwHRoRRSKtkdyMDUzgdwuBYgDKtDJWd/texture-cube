import THREE from 'three'
import React, {Component, PropTypes} from 'react'

export default class World extends Component{

  static displayName = 'World'

  constructor(){
    super()
  }

  render() {
    return (
      <group
        key={'world'}
        position={this.props.position}
        quaternion={this.props.quaternion}
      >
        <mesh
          key={'surface-level'}
          quaternion={new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2)}
        >
          <planeBufferGeometry
            key={'surface-level-geometry'}
            width={500}
            height={500}
            widthSegments={50}
            heightSegments={50}
          />
          <meshBasicMaterial
            key={'surface-level-material'}
            opacity={0.5}
            color={0x333000}
            side={THREE.DoubleSide}
            wireframe
          />
        </mesh>

        {this.props.children}

      </group>
    )
  }
}

World.propTypes = {
  position: PropTypes.instanceOf(THREE.Vector3),
  quaternion: PropTypes.instanceOf(THREE.Quaternion),
}

/*
      <group>
        {this.props.children}
      </group>

*/
