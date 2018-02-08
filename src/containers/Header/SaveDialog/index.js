import React from 'react';
import { connect } from 'react-redux';
import { ModalBody, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

import Wrapper from './Wrapper';

class ImagesDialog extends React.Component {
  state = {
    filename: ''
  };

  onSave = () => {
    const { canvas, onClose } = this.props;

    let filename = this.inputRef.value;
    if (filename.slice(-4) !== '.png') {
      filename = `${filename}.png`;
    }

    this.setState({ saving: true });

    let image = canvas.toDataURL('png');
    image = image.replace('data:image/png;base64,', '');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('filename', filename);

    let url = `./save-images/`;
    if (process.env.NODE_ENV !== 'production') {
      url = `http://localhost/dev/save-images/`;
    }
    axios.post(url, formData).then(
      response => {
        onClose();
      },
      error => {
        console.log(error);
        onClose();
      }
    );
  };

  render() {
    const { onClose } = this.props;
    const { saving, filename } = this.state;

    return (
      <Wrapper isOpen toggle={!saving ? onClose : null} className={saving ? 'saving' : ''}>
        {!saving ? (
          <ModalBody>
            <div>
              <Label>Please enter file name</Label>
              <Input
                value={filename}
                innerRef={ref => {
                  if (ref) {
                    this.inputRef = ref;
                    this.inputRef.focus();
                  }
                }}
                onChange={e => {
                  this.setState({ filename: e.target.value });
                }}
              />
            </div>
            <div className="float-right mt-3">
              <Button color="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" disabled={!filename} onClick={this.onSave}>
                Save
              </Button>
            </div>
          </ModalBody>
        ) : (
          <div>Saving...</div>
        )}
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    canvas: state.stage.canvas
  }),
  {}
)(ImagesDialog);
