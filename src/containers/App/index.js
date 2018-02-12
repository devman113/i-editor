import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { fabric } from 'fabric';

import { FONTS } from 'components/FontSelect';
import { setCanvas, resizeStage } from 'redux/stage';
import Header from '../Header';
import ToolBar from '../ToolBar';
import PropertyPanel from '../PropertyPanel';
import Wrapper from './Wrapper';

class App extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.props.resizeStage);
    document.addEventListener('keydown', this.onKeyDown);

    const canvas = new fabric.Canvas('canvas', { backgroundColor: 'white', width: 1000, height: 750 });
    canvas.renderAll();

    this.props.setCanvas(canvas, this.container);
    setTimeout(() => {
      this.props.resizeStage();
    });
  }

  onKeyDown = event => {
    if (event.key === 'Delete') {
      const { canvas } = this.props;
      const objects = canvas.getActiveObjects();
      objects.forEach(obj => {
        canvas.remove(obj);
      });
      canvas.discardActiveObject();
    }
  };

  render() {
    const { stageW, stageH, canvas } = this.props;

    return (
      <Wrapper stageW={stageW} stageH={stageH}>
        <Helmet>
          {FONTS.map(
            ({ name, google }, index) =>
              google && (
                <link
                  key={index}
                  href={`https://fonts.googleapis.com/css?family=${name}`}
                  rel="stylesheet"
                  type="text/css"
                />
              )
          )}
        </Helmet>

        <Header />

        <main>
          <ToolBar />

          <div
            className="stage-container"
            ref={ref => {
              this.container = ref;
            }}
          >
            <canvas id="canvas" />
          </div>

          {canvas && <PropertyPanel />}
        </main>
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    canvas: state.stage.canvas,
    stageW: state.stage.stageW,
    stageH: state.stage.stageH
  }),
  { setCanvas, resizeStage }
)(App);
