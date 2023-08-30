import * as Cesium from 'cesium';
import { showTime } from './utils/showTime';

class Clock {
  viewer!: Cesium.Viewer;
  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer;
    // console.log("clockRange", this.viewer.clock.clockRange);
    // console.log("clockStep", this.viewer.clock.clockStep);
    // console.log("multiplier", this.viewer.clock.multiplier);
    // console.log("canAnimate", this.viewer.clock.canAnimate);
    // console.log("shouldAnimate", this.viewer.clock.shouldAnimate);
    // console.log("currentTime", this.viewer.clock.currentTime.toString());
    // console.log("startTime", this.viewer.clock.startTime.toString());
    // console.log("stopTime", this.viewer.clock.stopTime.toString());

    // let currentTimeJulianDate = this.viewer.clock.currentTime;
    // let currentTimeDateString = this.getTime(currentTimeJulianDate);
  }

  setTime(time: string = '2023-07-01 08:00:00'): void {
    const currentDate = new Date(time);
    const currentJulianDate = Cesium.JulianDate.fromDate(currentDate);
    const endTimeJulianDate = Cesium.JulianDate.addDays(
      currentJulianDate,
      2,
      new Cesium.JulianDate(),
    );
    this.viewer.clock.currentTime = currentJulianDate;
    this.viewer.timeline.zoomTo(currentJulianDate, endTimeJulianDate);
  }

  getTime(julianDate: Cesium.JulianDate) {
    let date = Cesium.JulianDate.toDate(julianDate);
    return showTime(date);
  }
}

export default Clock;
