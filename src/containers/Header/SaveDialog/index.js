import React from 'react';
import { connect } from 'react-redux';
import { ModalBody, Label, Input, Button, Progress } from 'reactstrap';
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

    const image = canvas.toDataURL('png');
    const arr = image.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const formData = new FormData();
    formData.append(filename, new File([u8arr], filename, { type: mime }));

    let url = `./save-images/`;
    if (process.env.NODE_ENV !== 'production') {
      url = `http://localhost/dev/save-images1/`;
    }
    axios
      .post(url, formData, progress => {
        this.setState({ label: 'Uploading...', progress: Math.floor(progress.loaded / progress.total * 100) });
      })
      .then(
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
    const { progress, label, filename } = this.state;

    return (
      <Wrapper isOpen toggle={!progress ? onClose : null} className={progress ? 'saving' : ''}>
        {!progress ? (
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
          <div>
            <Progress animated value={progress}>
              {progress}%
            </Progress>
            {label && <div>{label}</div>}
          </div>
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
