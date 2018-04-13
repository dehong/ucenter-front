import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List,Tabs } from 'antd';

import Ellipsis from 'components/Ellipsis';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Test.less';
const { Meta } = Card;
const TabPane = Tabs.TabPane;

export default class Test extends PureComponent {


  render() {

    return (
        <div gutter={24} className={"tttt"}>
            <div className={styles.cardList}>
            <Card
            hoverable
            className={styles.card} 
            cover={<img alt="example" style={{ width: 48, height:48,marginTop:20, borderRadius: 10 }} 
                src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png" />}
            >
            <Meta
            title="运营决策系统系统系统"
            />
            </Card>
        </div>
        </div>
        
    );
  }
}
