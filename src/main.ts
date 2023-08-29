import "cesium/Build/Cesium/Widgets/widgets.css";
import { Ion, Viewer } from "cesium";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTE0YmFlMi02ODc3LTQyYzAtODZmNi0zMjc5ZmQ3YjNmZmUiLCJpZCI6OTk1ODMsImlhdCI6MTY3NTQyMDAyMn0.XpOm_Xbc3Nq2I8KIWtAVd-_1DIxwWlyv9irqsN88hA4";

const options: Viewer.ConstructorOptions = {
  infoBox: false,
  selectionIndicator: false,
  shadows: true,
  shouldAnimate: true,
};

export const viewer = new Viewer("cesium-container", options);
