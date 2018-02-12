import * as C from './constants';

const initialState = {
  canvas: null,
  container: null,
  stageW: 1000,
  stageH: 750,

  selectedTool: null,

  attributes: {
    line: {
      stroke: '#000000',
      strokeWidth: 10
    },
    textbox: {
      fontFamily: 'Abril Fatface',
      fontSize: 30,
      fill: '#000000'
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case C.SET_CANVAS:
      return {
        ...state,
        canvas: action.canvas,
        container: action.container
      };

    case C.SET_STAGE_SIZE:
      return {
        ...state,
        stageW: action.stageW,
        stageH: action.stageH
      };

    case C.SELECT_TOOL:
      return {
        ...state,
        selectedTool: action.selectedTool
      };

    case C.SET_ATTRIBUTE:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.obj]: {
            ...state.attributes[action.obj],
            [action.name]: action.value
          }
        }
      };

    default:
      return state;
  }
}
