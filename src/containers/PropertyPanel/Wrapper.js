import styled from 'styled-components';

export default styled.aside`
  width: 300px;
  padding: 20px;
  background-color: #2d2d2d;
  z-index: 1;

  hr {
    background-color: #444;
  }

  .tool-field {
    margin-bottom: 20px;

    label {
      display: block;
      font-size: 80%;
      font-weight: 400;
      color: #888;
    }
  }

  .stroke-field {
    display: flex;
    > div:first-child {
      width: 75px;
    }
    > div:last-child {
      flex: 1;
      > div {
        margin-top: 20px;
      }
    }
  }
`;
