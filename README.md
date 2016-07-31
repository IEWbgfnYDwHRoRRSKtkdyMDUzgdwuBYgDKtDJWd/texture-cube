# texture-cube

Shows how to control the way textures are rendered on each side of a CubeGeometry. See the [live example](https://abudaan.github.io/texture-cube/).

There are several ways you can apply a texture to a cube:

 - MultiMaterial
 - CubeTexture
 - Single texture image with 6 segments

I am going to use MultiMaterial. A MultiMaterial is a material that consists of multiple materials. You can pass an array containing the materials you want to use to the property `materials`. To apply a certain material to a certain face (side) of the cube, the index of the material in the materials array should match the index of the face in the geometry. In a CubeGeometry the face indices are as follows:

 0. right
 1. left
 2. back
 3. front
 4. top
 5. bottom



## Links
 - Very helpful article about texture mapping in Threejs [link](http://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1/)