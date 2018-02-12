import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { fabric } from 'fabric';

import FontSelect from 'components/FontSelect';
import ColorPicker from 'components/ColorPicker';
import { setAttribute } from 'redux/stage';
import Wrapper from './Wrapper';

const SliderWithTooltip = createSliderWithTooltip(Slider);

class PropertyPanel extends React.PureComponent {
  state = {
    attributes: { line: true, textbox: true }
  };

  componentDidMount() {
    const { canvas } = this.props;
    canvas.on('selection:created', this.updateSelection);
    canvas.on('selection:updated', this.updateSelection);
    canvas.on('selection:cleared', () => this.updatedTool(this.props.selectedTool));
  }

  componentWillReceiveProps(nextProps) {
    const { selectedTool } = nextProps;
    if (selectedTool !== this.props.selectedTool) {
      if (!this.props.canvas.getActiveObjects().length) {
        this.updatedTool(selectedTool);
      }
    }
  }

  updatedTool = selectedTool => {
    const attributes = selectedTool ? this.props.attributes[selectedTool] : {};
    this.setState({ attributes });
  };

  updateSelection = () => {
    const { canvas, setAttribute } = this.props;

    const objects = canvas.getActiveObjects();
    let attributes;

    objects.forEach(obj => {
      const type = obj.get('type');
      const attributes0 = this.props.attributes[type];
      if (!attributes) {
        attributes = { ...attributes0 };
      }

      Object.keys(attributes).forEach(name => {
        if (attributes0[name] !== undefined) {
          const value = obj.get(name);
          setAttribute(type, name, value);
        } else {
          delete attributes[name];
        }
      });
    });

    this.setState({ attributes });
  };

  getDefaultInfo = () => {
    const { canvas } = this.props;
    return {
      originX: 'center',
      originY: 'center',
      rotatingPointOffset: canvas.width * 0.04,
      padding: canvas.width * 0.01,
      cornerSize: canvas.width * 0.02,
      cornerColor: '#43b9d3',
      cornerStyle: 'circle',
      transparentCorners: false
    };
  };

  onChange = (name, value) => {
    const { canvas, setAttribute } = this.props;

    if (value === undefined) {
      const info = Object.assign({}, this.state.attributes, this.props.attributes[name]);
      const { width, height } = canvas;
      let obj;
      switch (name) {
        case 'line': {
          const { stroke, strokeWidth, fill } = info;
          obj = new fabric.Line([width * 0.3, height * 0.5, width * 0.7, height * 0.5], {
            fill,
            stroke,
            strokeWidth,
            ...this.getDefaultInfo()
          });
          obj.setControlVisible('tl', false);
          obj.setControlVisible('bl', false);
          obj.setControlVisible('mb', false);
          obj.setControlVisible('br', false);
          obj.setControlVisible('tr', false);
          obj.setControlVisible('mt', false);
          break;
        }

        case 'textbox': {
          const { fontFamily, fontSize, fill } = info;
          obj = new fabric.Textbox('Add Text', {
            fontFamily,
            fontSize,
            fill,
            left: width / 2,
            top: height / 2,
            width: fontSize * 4.5,
            ...this.getDefaultInfo()
          });
          break;
        }
        default:
          return;
      }

      canvas.add(obj).setActiveObject(obj);
      return;
    }

    const objects = this.props.canvas.getActiveObjects();
    if (objects.length) {
      objects.forEach(obj => {
        const type = obj.get('type');
        obj.set({ [name]: value });
        setAttribute(type, name, value);
      });
      canvas.renderAll();
    }

    this.setState({
      attributes: {
        ...this.state.attributes,
        [name]: value
      }
    });
  };

  render() {
    const { selectedTool } = this.props;
    const { attributes } = this.state;
    const isSelectedObjs = this.props.canvas.getActiveObjects().length > 0;
    const showAll = !selectedTool && !isSelectedObjs;

    return (
      <Wrapper>
        <div>
          {(showAll || selectedTool === 'line') && (
            <div className="add-btn" onClick={font => this.onChange('line')}>
              {'Add Line'}
            </div>
          )}

          {(showAll || selectedTool === 'textbox') && (
            <div className="add-btn" onClick={font => this.onChange('textbox')}>
              {'Add Text'}
            </div>
          )}

          {(selectedTool || isSelectedObjs) && <hr />}
        </div>

        {attributes.fontFamily !== undefined && (
          <div className="tool-field">
            <label>Font Name</label>
            <FontSelect value={attributes.fontFamily} onChange={font => this.onChange('fontFamily', font.name)} />
          </div>
        )}

        {attributes.fontSize !== undefined && (
          <div className="tool-field">
            <label>Font Size</label>
            <SliderWithTooltip
              min={1}
              max={200}
              value={attributes.fontSize}
              tipFormatter={value => `${value}`}
              onChange={v => this.onChange('fontSize', v)}
            />
          </div>
        )}

        {attributes.fill !== undefined && (
          <div className="tool-field">
            <Label>Fill</Label>
            <ColorPicker color={attributes.fill} onChange={e => this.onChange('fill', e.hex)} />
          </div>
        )}

        {attributes.strokeWidth !== undefined && (
          <div className="tool-field">
            <label>Width</label>
            <SliderWithTooltip
              min={1}
              max={50}
              value={attributes.strokeWidth}
              tipFormatter={value => `${value}`}
              onChange={v => this.onChange('strokeWidth', v)}
            />
          </div>
        )}

        {attributes.stroke !== undefined && (
          <div className="tool-field">
            <Label>Stroke</Label>
            <ColorPicker color={attributes.stroke} onChange={e => this.onChange('stroke', e.hex)} />
          </div>
        )}
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    canvas: state.stage.canvas,
    attributes: state.stage.attributes,
    selectedTool: state.stage.selectedTool
  }),
  { setAttribute }
)(PropertyPanel);
