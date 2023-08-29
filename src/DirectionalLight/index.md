# 1.3 DirectionalLight

> `@sl-theia/theia-cim`中的`DirectionalLight`组件

## 作用

`DirectionalLight`提供了一种通过 GUI 界面控件操作的形式，用于在 Cesium 场景中控制、记录当前直射光信息。

它允许你传入初始化参数设置模型信息，若是没有，也能通过之前操作记录在浏览器 IndexDB 的参数来初始化设置模型信息。

## 示例

以下展示`DirectionalLight`组件用法，使用者可以通过 GUI 界面控制操作的形式，修改参数信息，来达到场景模型的变化。

```jsx
import React, { useRef, useEffect, type FC } from 'react';
import * as Cesium from 'cesium'
import { Camera, Model, DirectionalLight } from '@sl-theia/theia-cim';
import * as dat from 'dat.gui';
import './index.less';

export default () => {
  const cesiumRef = useRef(null);

  useEffect(() => {
    const gui = new dat.GUI({
      name: 'Cesium GUI',
      width: 450,
      autoPlace: true,
      closed: false,
    });
    gui.domElement.id = 'gui';
    gui.domElement.style = 'position:absolute;top:10px;left:10px;';
    gui.show();
    cesiumRef.current.appendChild(gui.domElement);

    const viewer = new Cesium.Viewer('cesiumContainer', {
      shadows: true,
      terrainShadows: Cesium.ShadowMode.RECEIVE_ONLY,
    });

    let camera = new Camera(
      viewer,
      gui,
      {
        position: {
          height: 359,
          longitude: 114.047245,
          latitude: 22.504446,
        },
        headingPitchRoll: {
          heading: 28.084072,
          pitch: -26.346292,
          roll: 0,
        },
      },
      true,
    );

    let model = new Model(
      viewer,
      gui,
      '/static/model/CesiumBalloon.glb',
      Cesium.Cartesian3.fromDegrees(114.05104099176157, 22.509032825095247, 50),
      {
        show: true,
        scale: 7.0,
        maximumScale: 256,
        minimumPixelSize: 0.0,
        incrementallyLoadTextures: false,
        runAnimations: true,
        clampAnimations: true,
        shadows: Cesium.ShadowMode.ENABLED,
        silhouetteSize: 0.0,
        silhouetteColor: '#0000ff',
        color: '#ffffff',
        colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
        colorBlendAmount: 0.5,
      },
      true,
    );

    const directionalLight = new DirectionalLight(viewer, gui, {
      direction: {
        longitude: -67,
        latitude: -8.4,
      },
      color: [255, 223, 223, 1],
      intensity: 6.2,
    });
  }, []);
  return (
    <div ref={cesiumRef} className={'cameraContainer'}>
      <div id="cesiumContainer"></div>
    </div>
  );
};
```

## API

### `new DirectionalLight(viewer: Cesium.Viewer, gui: dat.GUI, directionalLightParams?: DirectionalLightParamsInterface, hideGui?: boolean)`

创建一个`DirectionalLight`对象。

| 参数                   | 类型                            | 描述                                          |
| ---------------------- | ------------------------------- | --------------------------------------------- |
| viewer                 | Cesium.Viewer                   | Cesium.Viewer 对象                            |
| gui                    | dat.GUI                         | dat.GUI 对象                                  |
| directionalLightParams | DirectionalLightParamsInterface | （可选）直射光信息参数接口                    |
| hideGui                | boolean                         | （可选）控制直射光信息的 GUI 界面控件显示隐藏 |

## 类型

### `DirectionalLightParamsInterface`

场景直射光信息参数。

| 参数      | 类型     | 描述                                                                                 |
| --------- | -------- | ------------------------------------------------------------------------------------ |
| direction | boolean  | 光照朝向，包括: <br> • longitude: 经度。<br> • latitude: 纬度。<br> • height: 高度。 |
| color     | number[] | 光照颜色                                                                             |
| intensity | number   | 光照强度                                                                             |

## 相关资料

- [Cesium](https://cesium.com/)
- [Cesium Documentation](https://cesium.com/docs/)
