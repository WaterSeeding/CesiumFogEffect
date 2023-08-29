# 1.2 Model

> `@sl-theia/theia-cim`中的`Model`组件

## 作用

`Model`提供了一种通过 GUI 界面控件操作的形式，用于在 Cesium 场景中控制、记录当前模型信息。

它允许你传入初始化参数设置模型信息，若是没有，也能通过之前操作记录在浏览器 IndexDB 的参数来初始化设置模型信息。

## 示例

以下展示`Model`组件用法，使用者可以通过 GUI 界面控制操作的形式，修改参数信息，来达到场景模型的变化。

```jsx
import React, { useRef, useEffect, type FC } from 'react';
import * as Cesium from 'cesium'
import { Camera, Model } from '@sl-theia/theia-cim';
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

    const viewer = new Cesium.Viewer('cesiumContainer');

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
    );
  }, []);
  return (
    <div ref={cesiumRef} className={'cameraContainer'}>
      <div id="cesiumContainer"></div>
    </div>
  );
};
```

## API

### `new Model(viewer: Cesium.Viewer, gui: dat.GUI, modelParams?: ModelParamsInterface, hideGui?: boolean)`

创建一个`Model`对象。

| 参数        | 类型                 | 描述                                        |
| ----------- | -------------------- | ------------------------------------------- |
| viewer      | Cesium.Viewer        | Cesium.Viewer 对象                          |
| gui         | dat.GUI              | dat.GUI 对象                                |
| modelParams | ModelParamsInterface | （可选）模型信息参数接口                    |
| hideGui     | boolean              | （可选）控制模型信息的 GUI 界面控件显示隐藏 |

## 类型

### `ModelParamsInterface`

场景模型信息参数。

| 参数                      | 类型    | 描述                                                         |
| ------------------------- | ------- | ------------------------------------------------------------ |
| show                      | boolean | 模型显示隐藏                                                 |
| scale                     | number  | 模型缩放大小                                                 |
| incrementallyLoadTextures | boolean | 确定加载模型后，纹理是否可能继续流入                         |
| runAnimations             | boolean | 指定是否应启动模型中指定的 glTF 动画                         |
| clampAnimations           | boolean | 指定 glTF 动画是否应在没有关键帧的持续时间内保持最后一个姿势 |
| shadows                   | number  | 一个枚举属性，指定模型是投射还是接收来自光源的阴影           |
| silhouetteSize            | number  | 一个数字属性，指定侧面影像的大小（以像素为单位）             |
| silhouetteColor           | number  | 指定轮廓的 Color 的属性                                      |
| color                     | string  | 指定与模型呈现的颜色混合的 Color 的属性                      |
| colorBlendMode            | number  | 一个枚举属性，指定颜色如何与模型混合                         |

## 相关资料

- [Cesium](https://cesium.com/)
- [Cesium Documentation](https://cesium.com/docs/)
