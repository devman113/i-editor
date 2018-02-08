import React from 'react';
import { connect } from 'react-redux';
import { fabric } from 'fabric';

import Wrapper from './Wrapper';

class LinePanel extends React.PureComponent {
  componentDidMount() {
    const { canvas } = this.props;
    canvas.on('mouse:down', this.onMouseDown);
    canvas.on('mouse:move', this.onMouseMove);
    canvas.on('mouse:up', this.onMouseUp);
    this.selectedObj = canvas.getActiveObject();
  }

  componentWillUnmount() {
    const { canvas } = this.props;
    canvas.off('mouse:down', this.onMouseDown);
    canvas.off('mouse:move', this.onMouseMove);
    canvas.off('mouse:up', this.onMouseUp);
  }

  onMouseDown = event => {
    const { canvas } = this.props;

    if (this.selectedObj) {
      this.selectedObj = canvas.getActiveObject();
      return;
    }

    this.selectedObj = canvas.getActiveObject();
    if (this.selectedObj) {
      return;
    }

    canvas.selection = false;

    this.isDown = true;

    const { stroke, strokeWidth, fill } = this.props.attributes;
    const pointer = canvas.getPointer(event.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];
    this.line = new fabric.Line(points, {
      fill,
      stroke,
      strokeWidth,
      rotatingPointOffset: canvas.width * 0.07,
      padding: canvas.width * 0.01,
      cornerSize: canvas.width * 0.02,
      cornerColor: '#43b9d3',
      cornerStyle: 'circle',
      transparentCorners: false
      // selectable: false
    });
    canvas.add(this.line);
    // canvas.add(this.makeCircle(this.line, 1), this.makeCircle(this.line, 2));
  };

  onMouseMove = event => {
    if (this.isDown) {
      const { canvas } = this.props;
      let pointer = canvas.getPointer(event.e);
      this.line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    }
  };

  onMouseUp = () => {
    if (this.isDown) {
      const { canvas } = this.props;
      canvas.selection = true;
      canvas.setActiveObject(this.line);
      canvas.renderAll();
      this.selectedObj = this.line;
      this.line = null;
      this.isDown = false;
    }
  };

  makeCircle = (line, i) => {
    const left = line.get(`x${i}`);
    const top = line.get(`y${i}`);
    const c = new fabric.Circle({
      left,
      top,
      strokeWidth: 5,
      radius: 12,
      fill: 'rgba(0,0,0,0)',
      stroke: 'rgba(0,0,0,0)'
    });
    c.hasControls = c.hasBorders = false;

    c.line = line;
    c.line_i = i;
    return c;
  };

  render() {
    return <Wrapper />;
  }
}

export default connect(
  state => ({
    canvas: state.stage.canvas,
    attributes: state.stage.attributes.line
  }),
  {}
)(LinePanel);
