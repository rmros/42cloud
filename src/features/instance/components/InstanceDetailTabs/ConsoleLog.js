import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConsoleOutput } from 'app/orm/nova/server/actions';
import { selectConsoleOutput } from 'app/selectors/nova';

import { Spin } from 'antd';

class ConsoleLog extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(fetchConsoleOutput(this.props.instanceID));
  }

  render() {
    if (this.props.consoleOutput.loading) {
      return (
        <Spin />
      )
    } else {
      let log = this.props.consoleOutput.data.split('\n');
      let logNode = [];
      log.forEach((ele, index) => {
        logNode.push(
          <div key={index}>{ele}</div>
        )
      });
      return (
        <div>
          {logNode}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    consoleOutput: selectConsoleOutput(state),
  }
};

export default connect(mapStateToProps, null)(ConsoleLog);