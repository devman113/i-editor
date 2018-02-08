import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import FontSelect from 'components/FontSelect';
import ColorPicker from 'components/ColorPicker';
import { setAttribute } from 'redux/stage';
import Wrapper from './Wrapper';

const SliderWithTooltip = createSliderWithTooltip(Slider);

class PropertyPanel extends React.PureComponent {
  state = {
    attributes: {}
  };

  componentDidMount() {
    const { canvas } = this.props;
    canvas.on('selection:created', this.updateSelection);
    canvas.on('selection:updated', this.updateSelection);
    canvas.on('selection:cleared', this.clearSelection);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedTool } = nextProps;
    if (selectedTool !== this.props.selectedTool) {
      const objects = this.props.canvas.getActiveObjects();
      if (!objects.length) {
        const attributes = selectedTool === '' ? {} : this.props.attributes[selectedTool];
        this.setState({ attributes });
      }
    }
  }

  updateSelection = () => {
    const objects = this.props.canvas.getActiveObjects();
    let attributes;

    objects.forEach(obj => {
      const type = obj.get('type');
      if (!attributes) {
        attributes = { ...this.props.attributes[type] };
      }

      Object.keys(attributes).forEach(name => {
        const value = obj.get(name);
        if (value === null) {
          delete attributes[name];
        } else {
          this.props.setAttribute(type, name, value);
        }
      });
    });

    this.setState({ attributes });
  };

  clearSelection = () => {
    const { selectedTool } = this.props;
    const attributes = selectedTool === '' ? {} : this.props.attributes[selectedTool];
    this.setState({ attributes });
  };

  onChange = (name, value) => {
    const { canvas, setAttribute } = this.props;
    const objects = canvas.getActiveObjects();

    if (objects.length) {
      objects.forEach(obj => {
        obj.set({ [name]: value });
        const type = obj.get('type');
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
    const { attributes } = this.state;

    return (
      <Wrapper>
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

        {attributes.stroke !== undefined && (
          <div className="tool-field">
            <Label>Stroke</Label>
            <ColorPicker color={attributes.stroke} onChange={e => this.onChange('stroke', e.hex)} />
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
