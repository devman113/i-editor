import { put, takeEvery, call, select } from 'redux-saga/effects';
import * as C from './constants';

function* _resizeStage() {
  const { stage } = yield select();
  const cw = stage.canvas.width;
  const ch = stage.canvas.height;
  const ratio = cw / ch;

  let stageW = stage.container.clientWidth - 80;
  let stageH = stage.container.clientHeight - 80;
  if (ratio > stageW / stageH) {
    stageH = stageW / ratio;
  } else {
    stageW = stageH * ratio;
  }

  yield put({ type: C.SET_STAGE_SIZE, stageW, stageH });
}

function* resizeStage() {
  yield takeEvery(C.RESIZE_STAGE, _resizeStage);
}

function* _setBackgroundImage({ image }) {
  const { stage } = yield select();
  const { canvas } = stage;
  canvas.clear();
  canvas.setWidth(image.ref.naturalWidth);
  canvas.setHeight(image.ref.naturalHeight);
  canvas.setBackgroundImage(image.url, canvas.renderAll.bind(canvas));

  yield call(_resizeStage);
}

function* setBackgroundImage() {
  yield takeEvery(C.SET_BACKGROUND_IMAGE, _setBackgroundImage);
}

export default [resizeStage(), setBackgroundImage()];
