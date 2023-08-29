import * as Cesium from "cesium";
import { viewer } from "../../main";

let isWebgl2 = true;

// 片元着色器，直接从源码复制
let SkyBoxFS_3_0 = `uniform samplerCube u_cubeMap;
  in vec3 v_texCoord;
  void main()
  {
    vec4 color = texture(u_cubeMap, normalize(v_texCoord));
    out_FragColor = vec4(czm_gammaCorrect(color).rgb, czm_morphTime);
  }
`;

// 顶点着色器有修改，主要是乘了一个旋转矩阵
let SkyBoxVS_3_0 = `
  uniform mat3 u_rotateMatrix;
  in vec3 position;
  out vec3 v_texCoord;
  void main()
  {
    vec3 p = czm_viewRotation * u_rotateMatrix * (czm_temeToPseudoFixed * (czm_entireFrustum.y * position));
    gl_Position = czm_projection * vec4(p, 1.0);
    v_texCoord = position.xyz;
  }
 `;

let SkyBoxFS_2_0 = `
  uniform samplerCube u_cubeMap;

  varying vec3 v_texCoord;

  void main() {
    vec4 color = textureCube(u_cubeMap, normalize(v_texCoord));
    gl_FragColor = vec4(czm_gammaCorrect(color).rgb, czm_morphTime);
  }
`;

let SkyBoxVS_2_0 = `
  uniform mat3 u_rotateMatrix;
  attribute vec3 position;
  varying vec3 v_texCoord;

  void main() {
    vec3 p = czm_viewRotation * u_rotateMatrix * (czm_temeToPseudoFixed * (czm_entireFrustum.y * position));
    gl_Position = czm_projection * vec4(p, 1.0);
    v_texCoord = position.xyz;
  }
`;

let SkyBoxFS = isWebgl2 ? SkyBoxFS_3_0 : SkyBoxFS_2_0;
let SkyBoxVS = isWebgl2 ? SkyBoxVS_3_0 : SkyBoxVS_2_0;

export { SkyBoxFS, SkyBoxVS };
