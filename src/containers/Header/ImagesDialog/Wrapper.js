import styled from 'styled-components';
import { Modal } from 'reactstrap';

export default styled(Modal)`
  .modal-body {
    padding: 0;

    > div {
      width: 100%;
      padding-top: 50%;
      position: relative;

      .scroll-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 2rem;
        overflow-y: auto;

        .image-file {
          display: inline-block;
          width: 87px;
          padding-top: 87px;
          position: relative;

          * {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          img {
            padding: 8px;
          }

          &:hover {
            .mask {
              cursor: pointer;
            }
          }

          .selected {
            border: 3px solid #ffa94d !important;
          }

          .spinner {
            background-color: #fff;
          }
        }

        .loading {
          display: flex;
          justify-content: center;
          height: 100%;
        }
      }
    }
  }

  .btn {
    width: 100px;
  }

  .btn + .btn {
    margin-left: 15px;
  }
`;
