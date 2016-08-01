import THREE from 'three'

/**
 * Utility function that creates a promise from Image.onload and Image.onerror
 *
 * @param      {String}   url     the url
 * @return     {Promise}  a Promise that resolves when the image loading is done
 *                        and reject when an error occurs
 */
function imageLoaderPromise(url){
  let image = new Image()
  return new Promise(resolve => {
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      console.warn(`could not load ${url}`)
      resolve(null)
    }
    image.src = url
  })
}


/**
 * Preloads and array of images
 *
 * @param      {String}                 baseUrl  the base url
 * @param      {Array<String>}          images   array of images to be loaded
 * @return     {Object<String, Image>}  object containing all loaded images as
 *                                      Image instance, using the image name for
 *                                      key
 */
export function loadImages(baseUrl, images){
  let promises = images.map(texture => {
    return imageLoaderPromise(baseUrl + texture)
  })

  return Promise.all(promises)
  .then(values => {
    let result = {}
    values.forEach((value, i) => {
      if(value !== null){
        result[images[i]] = value
      }
    })
    return result
  })
}


function textureLoaderPromise(url){
  let loader = new THREE.TextureLoader()
  return new Promise(resolve => {
    loader.load(
      url,
      texture => {
        resolve(texture)
      },
      xhr => {
        //console.log(`loading texture ${url}: ${xhr.loaded / xhr.total * 100}%`)
      },
      xhr => {
        console.warn(`could not load ${url}`)
        resolve(null)
      }
    )
  })
}

/**
 * Utility function that loads an array of texture images
 * @param baseUrl {string} the url of the folder where the texture images are stored
 * @param textures {array <string>} array containing file names of the texture images
 * @returns {Promise.<TResult>}
 */
export function loadTextures(baseUrl, textures){
  let promises = textures.map(texture => {
    return textureLoaderPromise(baseUrl + texture)
  })

  return Promise.all(promises)
  .then(values => {
    let result = {}
    values.forEach((value, i) => {
      if(value !== null){
        result[textures[i]] = value
      }
    })
    return result
  })
}

/**
 * Creates a random color as hex string
 *
 * @return     {String}  the random color
 */
export function getRandomColor(){
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}


/*
  0,1  0,0  1,1
  0,0  1,0  1,1
*/
const getUVsByRotation = function(rotation, edges){

  let uvs = []

  switch(rotation){
    case 0:
      uvs.push([edges[0], edges[1], edges[3]])
      uvs.push([edges[1], edges[2], edges[3]])
      break

    case 90:
      uvs.push([edges[1], edges[2], edges[0]])
      uvs.push([edges[2], edges[3], edges[0]])
      break

    case -90:
      uvs.push([edges[3], edges[0], edges[2]])
      uvs.push([edges[0], edges[1], edges[2]])
      break

    case 180:
    case -180:
      uvs.push([edges[2], edges[3], edges[1]])
      uvs.push([edges[3], edges[0], edges[1]])
      break

    default:
      uvs.push([edges[0], edges[1], edges[3]])
      uvs.push([edges[1], edges[2], edges[3]])

      console.warn(`rotation ${rotation} not supported, only 90, -90, 180 and -180 are allowed`)
  }

  return uvs
}


export function getCubeGeometryUVs(rotations, unityValues, width, height, depth){

  let uvs = [[]]

  rotations.forEach((rotation, r) => {
    let unity = unityValues[r]
    let w, s

    if(r < 2){
      w = depth / unity.width
      s = height / unity.height
    }else if(r < 4){
      w = width / unity.width
      s = depth / unity.height
    }else if(r < 6){
      w = width / unity.width
      s = height / unity.height
    }

    if(rotation === 90 || rotation === -90){
      [w, s] = [s, w]
    }

    let edges = [
      new THREE.Vector2(0, s),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(w, 0),
      new THREE.Vector2(w, s),
    ]

    uvs[0].push(...getUVsByRotation(rotation, edges))
  })

  return uvs
}

