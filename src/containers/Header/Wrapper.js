import styled from 'styled-components';

export default styled.header`
  height: 60px;
  background-color: #3c3c3c;

  .logo {
    float: left;
    line-height: 60px;
    padding: 0 20px;
    font-size: 20px;
    font-weight: bold;
    color: #adadad;
  }

  .content {
    text-align: right;
    padding-right: 20px;

    .menu-item {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      color: #adadad;
      cursor: pointer;

      svg {
        width: 18px !important;
        height: 18px !important;
      }

      span {
        font-size: 12px;
        margin-top: 2px;
      }

      &:hover {
        color: #ffa94d;
      }
    }
  }
`;
