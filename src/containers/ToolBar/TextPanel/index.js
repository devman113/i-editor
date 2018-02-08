import React from 'react';
import { connect } from 'react-redux';
import { fabric } from 'fabric';
import Wrapper from './Wrapper';

class TextPanel extends React.PureComponent {
  componentWillMount() {
    const { canvas } = this.props;
    canvas.on('mouse:down', this.onMouseDown);
    canvas.on('mouse:up', this.onMouseUp);
    this.selectedObj = canvas.getActiveObject();
  }

  componentWillUnmount() {
    const { canvas } = this.props;
    canvas.off('mouse:down', this.onMouseDown);
    canvas.off('mouse:up', this.onMouseUp);
  }

  onMouseDown = event => {
    this.downPosX = event.e.clientX;
    this.downPosY = event.e.clientY;
  };

  onMouseUp = event => {
    const { canvas } = this.props;

    if (this.selectedObj) {
      this.selectedObj = canvas.getActiveObject();
      return;
    }

    this.selectedObj = canvas.getActiveObject();
    if (this.selectedObj) {
      return;
    }

    const dx = this.downPosX - event.e.clientX;
    const dy = this.downPosY - event.e.clientY;
    if (dx * dx + dy * dy > 100) {
      return;
    }

    const { fontFamily, fontSize, fill } = this.props.attributes;
    const pointer = canvas.getPointer(event.e);
    this.selectedObj = new fabric.Textbox('Add Text', {
      left: pointer.x,
      top: pointer.y,
      width: fontSize * 4.5,
      fontFamily,
      fontSize,
      fill,
      rotatingPointOffset: canvas.width * 0.07,
      padding: canvas.width * 0.01,
      cornerSize: canvas.width * 0.02,
      cornerColor: '#43b9d3',
      cornerStyle: 'circle',
      transparentCorners: false
    });
    canvas.add(this.selectedObj).setActiveObject(this.selectedObj);
  };

  render() {
    return <Wrapper />;
  }
}

export default connect(
  state => ({
    canvas: state.stage.canvas,
    attributes: state.stage.attributes.textbox
  }),
  {}
)(TextPanel);
