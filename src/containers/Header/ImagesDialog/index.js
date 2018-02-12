import React from 'react';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from 'axios';

import { setBackgroundImage } from 'redux/stage';
import Wrapper from './Wrapper';

class ImagesDialog extends React.Component {
  state = {};

  componentWillMount() {
    let url = `./images/`;
    if (process.env.NODE_ENV !== 'production') {
      url = `http://localhost/dev/images1/`;
    }

    return axios.get(url).then(
      response => {
        const images = response.data.map(file => ({ url: `./images/${file}` }));
        this.setState({ images }, () => {
          setTimeout(() => this.loadImage(0));
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  loadImage = index => {
    let images = this.state.images;
    if (index < images.length) {
      const image = images[index];
      image.ref.onload = () => {
        images = images.slice(0);
        images[index] = { ...image, isLoaded: true };
        this.setState({ images });
        this.loadImage(index + 1);
      };
      image.ref.src = image.url;
    }
  };

  onSelectImage = selectedImage => this.setState({ selectedImage });

  onOpenImage = iamge => {
    this.props.setBackgroundImage(iamge);
    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { images, selectedImage } = this.state;

    return (
      <Wrapper isOpen size="lg" toggle={onClose}>
        <ModalHeader toggle={onClose}>Open Image</ModalHeader>

        <ModalBody>
          <div>
            <div className="scroll-container">
              {images ? (
                images.map((image, index) => (
                  <div className="image-file" key={index}>
                    <img
                      alt=""
                      ref={ref => {
                        image.ref = ref;
                      }}
                    />
                    <span
                      className={`${image.isLoaded ? 'mask' : 'spinner'} ${
                        (selectedImage || {}).url === image.url ? 'selected' : ''
                      }`}
                      onClick={() => this.onSelectImage(image)}
                      onDoubleClick={() => this.onOpenImage(image)}
                    />
                  </div>
                ))
              ) : (
                <div className="loading">
                  <div className="spinner" />
                </div>
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => this.onOpenImage(selectedImage)} disabled={!selectedImage}>
            Open
          </Button>{' '}
        </ModalFooter>
      </Wrapper>
    );
  }
}

export default connect(state => ({}), { setBackgroundImage })(ImagesDialog);
