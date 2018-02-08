import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import faFont from '@fortawesome/fontawesome-free-solid/faFont';

import { selectTool } from 'redux/stage';
import LinePanel from './LinePanel';
import TextPanel from './TextPanel';
import Wrapper from './Wrapper';

const TOOLS = [
  {
    name: 'line',
    icon: faPencilAlt,
    label: 'Line'
  },
  {
    name: 'textbox',
    icon: faFont,
    label: 'Text'
  }
];

class ToolBar extends React.PureComponent {
  onSelectTool = toolName => {
    this.props.selectTool(toolName !== this.props.selectedTool ? toolName : '');
  };

  renderPanel = () => {
    switch (this.props.selectedTool) {
      case 'line':
        return <LinePanel />;

      case 'textbox':
        return <TextPanel />;

      default:
        return '';
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="tool-bar">
          {TOOLS.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${item.name === this.props.selectedTool ? 'active' : ''}`}
              onClick={() => this.onSelectTool(item.name)}
            >
              <FontAwesomeIcon icon={item.icon} />
            </div>
          ))}
        </div>
        <div className="tool-panel">{this.renderPanel()}</div>
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    selectedTool: state.stage.selectedTool
  }),
  {
    selectTool
  }
)(ToolBar);
