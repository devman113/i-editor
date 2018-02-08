import styled from 'styled-components';
import { Modal } from 'reactstrap';

export default styled(Modal)`
  &.saving {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: auto;

    .modal-content {
      width: auto;
      background-color: transparent;
      color: #fff;
      border: none;
    }
  }

  .btn {
    width: 100px;
  }

  .btn + .btn {
    margin-left: 15px;
  }
`;
