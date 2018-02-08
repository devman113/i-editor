import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  main {
    flex: 1;
    display: flex;

    .stage-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1e1e1e;

      .canvas-container {
        ${props => css`
          width: ${props.stageW}px !important;
          height: ${props.stageH}px !important;
        `};

        canvas {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }
`;
