// const shader = `
//   uniform sampler2D colorTexture;
//   uniform sampler2D depthTexture;
//   uniform float visibility;
//   uniform vec4 color;
//   in vec2 v_textureCoordinates; 
//   out vec4 fragColor;
//   void main(void) { 
//     vec4 origcolor = texture(colorTexture, v_textureCoordinates); 
//     float depth = czm_readDepth(depthTexture, v_textureCoordinates); 
//     vec4 depthcolor = texture(depthTexture, v_textureCoordinates); 
//     float f = visibility * (depthcolor.r - 0.3) / 0.2; 
//     if (f < 0.0) f = 0.0; 
//     else if (f > 1.0) f = 1.0; 
//     fragColor = mix(origcolor, color, f); 
//   }
// `

const shader = `
  uniform sampler2D colorTexture;
  uniform sampler2D depthTexture;
  in vec2 v_textureCoordinates; 
  out vec4 fragColor;
  
  void main(void) {
    vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 origcolor = texture(colorTexture, v_textureCoordinates); 
    vec4 depthcolor = texture(depthTexture, v_textureCoordinates); 
    fragColor = mix(origcolor, color, 0.5); 
  }
`

export default shader;
