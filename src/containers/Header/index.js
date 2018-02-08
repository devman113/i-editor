import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFolderOpen from '@fortawesome/fontawesome-free-regular/faFolderOpen';
import faSave from '@fortawesome/fontawesome-free-regular/faSave';

import ImagesDialog from './ImagesDialog';
import SaveDialog from './SaveDialog';
import Wrapper from './Wrapper';

class Header extends React.Component {
  state = {};

  openDialog1 = () => this.setState({ isDialog1: true });
  closeDialog1 = () => this.setState({ isDialog1: false });

  openDialog2 = () => this.setState({ isDialog2: true, filename: '' });
  closeDialog2 = () => this.setState({ isDialog2: false });

  onChangeName = e => this.setState({ filename: e.target.value });

  render() {
    return (
      <Wrapper>
        <div className="logo">Image Editor</div>

        <div className="content">
          <div className="menu-item" onClick={this.openDialog1}>
            <FontAwesomeIcon icon={faFolderOpen} />
            <span>Open</span>
          </div>

          <div className="menu-item" onClick={this.openDialog2}>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </div>
        </div>

        {this.state.isDialog1 && <ImagesDialog onClose={this.closeDialog1} />}
        {this.state.isDialog2 && <SaveDialog onClose={this.closeDialog2} />}
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    canvas: state.stage.canvas
  }),
  {}
)(Header);
