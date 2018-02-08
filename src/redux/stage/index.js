import * as C from './constants';

export function setCanvas(canvas, container) {
  return { type: C.SET_CANVAS, canvas, container };
}

export function resizeStage() {
  return { type: C.RESIZE_STAGE };
}

export function setBackgroundImage(image) {
  return { type: C.SET_BACKGROUND_IMAGE, image };
}

export function selectTool(selectedTool) {
  return { type: C.SELECT_TOOL, selectedTool };
}

export function setAttribute(obj, name, value) {
  return { type: C.SET_ATTRIBUTE, obj, name, value };
}
