import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import styles from './style/Quota.css';
import QuotaItem from './QuotaItem.js';
import { QUOTA_TITLE_NAME } from 'features/overview/constants';


function Quota(props) {
  if (props.loading) {
    let quotaItems = props.quotaSet,
        quotaItemElements = [];

    for (let item in quotaItems) {
      if (quotaItems.hasOwnProperty(item) && (String(item) !== 'id')) {
        let used = quotaItems[item].in_use,
            limit = quotaItems[item].limit,
            left,
            title,
            pbUsed, // progressbar used
            pbLeft; // progressbar left

        if (QUOTA_TITLE_NAME.hasOwnProperty(item)) {
          title = QUOTA_TITLE_NAME[item]
        } else {
          title = String(item);
        }

        if (limit < 0) {
          limit = '无限';
          left = '无限';
          pbUsed = '0%';
          pbLeft = '100%';
        } else {
          left = limit - used;
          pbUsed = (used / limit).toFixed(2) * 100;
          pbLeft = 100 - pbUsed;

          pbUsed = String(pbUsed) + '%';
          pbLeft = String(pbLeft) + '%';
        }


        quotaItemElements.push(
          <QuotaItem
            key={item}
            title={title}
            used={used}
            left={left}
            limit={limit}
            pbUsed={pbUsed}
            pbLeft={pbLeft}
          />
        )
      }
    }

    return (
      <div className={styles.container}>
        <p className={styles.header}>
          资源配额使用情况
        </p>
        <div className={styles.quota}>
          {quotaItemElements}
        </div>
      </div>
    )
  } else {
    return (
      <Spin />
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.orm.nova.quotaSet.loading,
    quotaSet: state.orm.nova.quotaSet.data,
  }
}
export default connect(mapStateToProps, null)(Quota);