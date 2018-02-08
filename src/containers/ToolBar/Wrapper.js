import styled from 'styled-components';

export default styled.nav`
  display: flex;
  background-color: #333;
  z-index: 2;

  .tool-bar {
    width: 55px;

    .menu-item {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 17px 0;
      color: #adadad;
      cursor: pointer;

      svg {
        width: 20px !important;
        height: 20px !important;
      }

      &:hover {
        background-color: #3c3c3c;
        color: #ffa94d;
      }

      &.active {
        background-color: #252525;
        color: #ffa94d;
      }
    }
  }

  .tool-panel {
    background-color: #252525;
    z-index: 1;
  }
`;
