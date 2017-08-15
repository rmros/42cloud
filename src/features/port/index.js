import React from 'react';
import { connect } from 'react-redux';
import PortTable from './components/PortTable';
import { getPorts } from 'app/orm/neutron/port/actions';

import commonStyles from 'features/common/styles.css';

class Port extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getPorts());
  }

  render() {
    return (
      <div
        className={commonStyles.wrapper}
      >
        <PortTable />
      </div>
    )
  }
}

export default connect(null, null)(Port);