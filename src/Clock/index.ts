import * as Cesium from "cesium";
import { showTime } from "./utils/showTime";

class Clock {
  viewer!: Cesium.Viewer;
  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer;
  }

  setTime(time: string = "2023-07-01 08:00:00"): void {
    const currentDate = new Date(time);
    const currentJulianDate = Cesium.JulianDate.fromDate(currentDate);
    const endTimeJulianDate = Cesium.JulianDate.addMinutes(
      currentJulianDate,
      60,
      new Cesium.JulianDate()
    );
    this.viewer.clock.currentTime = currentJulianDate;

    // this.viewer.clock.startTime = currentJulianDate;
    // this.viewer.clock.stopTime = endTimeJulianDate;

    // this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    // this.viewer.clock.multiplier = 300;

    // this.viewer.timeline.zoomTo(currentJulianDate, endTimeJulianDate);
  }

  getTime(julianDate: Cesium.JulianDate) {
    let date = Cesium.JulianDate.toDate(julianDate);
    return showTime(date);
  }
}

export default Clock;
