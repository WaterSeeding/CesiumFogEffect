# 1.1 Camera

> `@sl-theia/theia-cim`中的`Camera`组件

## 作用

`Camera`提供了一种通过 GUI 界面控件操作的形式，用于在 Cesium 场景中控制、记录当前相机信息。

它允许你传入初始化参数设置相机信息，若是没有，也能通过之前操作记录在浏览器 IndexDB 的参数来初始化设置相机信息。

## 示例

以下展示`Camera`组件用法，使用者可以通过 GUI 界面控制操作的形式，修改参数信息，来达到场景镜头的变化。

```jsx
import React, { useRef, useEffect, type FC } from 'react';
import * as Cesium from 'cesium'
import { Camera } from '@sl-theia/theia-cim';
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
      terrain: Cesium.Terrain.fromWorldTerrain(),
    });

    const camera = new Camera(
      viewer,
      gui,
      {
        position: {
          height: 55871,
          longitude: 113.976006,
          latitude: 22.475603,
        },
        headingPitchRoll: {
          heading: 360,
          pitch: -89.897722,
          roll: 0,
        },
      },
      false,
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

### `new Camera(viewer: Cesium.Viewer, gui: dat.GUI, cameraParams?: CameraParamsInterface, hideGui?: boolean)`

创建一个`Camera`对象。

| 参数         | 类型                  | 描述                                                                                                                                            |
| ------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| viewer       | Cesium.Viewer         | Cesium.Viewer 对象                                                                                                                              |
| gui          | dat.GUI               | dat.GUI 对象                                                                                                                                    |
| cameraParams | CameraParamsInterface | （可选）相机镜头参数接口，包括: <br> • direction: 相机镜头朝向。 <br> • position: 相机镜头位置。<br> • headingPitchRoll: 相机镜头方位倾斜旋转。 |
| hideGui      | boolean               | （可选）控制相机的 GUI 界面控件显示隐藏                                                                                                         |

### `setView(cameraParams: CameraParamsInterface)`

添加`Camera`对象指定位置镜头事件。

| 参数         | 类型                  | 描述                                                                                                   |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------------------ |
| cameraParams | CameraParamsInterface | 相机镜头参数接口，包括: <br> • position: 相机镜头位置。<br> • headingPitchRoll: 相机镜头方位倾斜旋转。 |

### `setFly(cameraParams: CameraParamsInterface, completeCb: () => void)`

添加`Camera`对象指定位置飞行事件。

| 参数         | 类型                  | 描述                                                                                                   |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------------------ |
| cameraParams | CameraParamsInterface | 相机镜头参数接口，包括: <br> • position: 相机镜头位置。<br> • headingPitchRoll: 相机镜头方位倾斜旋转。 |
| completeCb   | Function              | 当事件发生结束时要调用的回调函数。                                                                     |

### `setFlyBoundingSphere(boundingSphere: Cesium.BoundingSphere, cameraParams: CameraParamsInterface, completeCb: () => void)`

添加`Camera`对象指定目标（BoundingSphere）飞行事件。

| 参数           | 类型                  | 描述                                                                    |
| -------------- | --------------------- | ----------------------------------------------------------------------- |
| boundingSphere | Cesium.BoundingSphere | Cesium.BoundingSphere 对象，相机目标。                                  |
| cameraParams   | CameraParamsInterface | 相机镜头参数接口，包括: <br> • headingPitchRoll: 相机镜头方位倾斜旋转。 |
| completeCb     | Function              | 当事件发生结束时要调用的回调函数。                                      |

### `getInfo()： void`

获取当前`Camera`镜头信息。

## 类型

### `CameraParamsInterface`

场景相机镜头参数。

| 参数             | 类型   | 描述                                                                                     |
| ---------------- | ------ | ---------------------------------------------------------------------------------------- |
| direction        | Object | 相机镜头朝向，包括: <br> • longitude: 经度。<br> • latitude: 纬度。<br> • height: 高度。 |
| position         | Object | 相机镜头位置，包括: <br> • longitude: 经度。<br> • latitude: 纬度。<br> • height: 高度。 |
| headingPitchRoll | Object | 相机镜朝向倾斜旋转， 包括: <br> • heading: 朝向。<br> • pitch: 倾斜。<br> • roll: 旋转。 |

## 相关资料

- [Cesium](https://cesium.com/)
- [Cesium Documentation](https://cesium.com/docs/)
