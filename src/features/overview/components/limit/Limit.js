import React, { Component } from 'react';
import { connect } from 'react-redux';
import LimitCard from './LimitCard';
import { Spin, Row, Col } from 'antd';

class Limit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.loading) {
      return (
        <Spin />
      )
    } else {
      return (
        <Row gutter={20}>
          <Col sm={12} md={12} lg={6} xl={24}>
          <LimitCard data={this.props.data.quota_set.instances}
                     colorKey='instances'
                     kind="云主机"
          />
          </Col>

          <Col sm={12} md={12} lg={6} xl={24}>
          <LimitCard data={this.props.data.quota_set.cores}
                     colorKey='cores'
                     kind="CPU核"
          />
          </Col>

          <Col sm={12} md={12} lg={6} xl={24}>
          <LimitCard data={this.props.data.quota_set.ram}
                     colorKey='ram'
                     kind="内存"
          />
          </Col>

          <Col sm={12} md={12} lg={6} xl={24}>
          <LimitCard data={this.props.data.quota_set.ram}
                     colorKey='ram'
                     kind="内存"
          />
          </Col>
        </Row>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    data: state.overview.payload,
    loading: state.overview.loading
  }

}
export default connect(mapStateToProps, null)(Limit);