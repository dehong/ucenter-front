import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, Popconfirm, Table } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { routerRedux } from 'dva/router';

import styles from './RoleList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['error', 'success'];
const status = ['禁用', '正常'];

const defaultPages = {
  currentPage: 1,
  pageSize: 10,
};

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="名称"
      >
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入角色名称！' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="描述"
      >
        {form.getFieldDecorator('description')(
          <Input placeholder="请输入" />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ role, loading }) => ({
  role,
  loading: loading.models.role,
}))
@Form.create()
export default class RoleList extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetch',
      payload: defaultPages,
    });
  }

  getColumns = () => {
    return [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '权限',
        dataIndex: 'authority',
      },
      {
        title: '操作',
        width: 120,
        align: 'center',
        render: (text, record) => {
          const { dispatch, match } = this.props;
          const { role: {data: {pagination}} } = this.props;
          return (
            <Fragment>
              <a onClick={function () {
                dispatch(routerRedux.push('/manage/user/edit?id='+record["id"]));
              }}>编辑</a>
              <Divider type="vertical"/>
    
              <Popconfirm title="确定删除?" onConfirm={function () {
                dispatch({
                  type: 'role/remove',
                  payload: record["id"],
                  callback:()=>{
                    const params = {
                      currentPage: pagination.current,
                      pageSize: pagination.pageSize,
                    };
                    dispatch({
                      type: 'role/fetch',
                      payload: params,
                    });
                  }
                });
              }}>
                <a href="#">删除</a>
              </Popconfirm>
            </Fragment>
          );
        }
      },
    ];
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'role/fetch',
      payload: defaultPages,
    });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'role/fetch',
        payload: {...values, ...defaultPages},
      });
    });
  }

  handleEdit = () => {
    const { dispatch, form } = this.props;
    dispatch(routerRedux.push('/manage/user/edit?id=' + record["id"]));
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    this.setState({
      modalVisible: false,
    });
    dispatch({
      type: 'role/add',
      payload: {
        name: fields.name,
        description: fields.description,
      },
      callback:()=>{
        dispatch({
          type: 'role/fetch',
          payload: defaultPages,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { role: { data }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const dataSource = data.list;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const rowSelection = {
      selectedRows,
      // onChange: this.handleRowSelectChange,
      // getCheckboxProps: record => ({
      //   disabled: record.disabled,
      // }),
    };

    return (
      <PageHeaderLayout >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <FormItem label="角色名称">
                      {getFieldDecorator('name')(
                        <Input placeholder="请输入" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={3} sm={24}>

                  </Col>
                  <Col md={6} sm={24}>
                    <span className={styles.submitButtons}>
                      <Button icon="search" type="primary" htmlType="submit">查询</Button>
                      <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                    </span>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              <Button onClick={() => this.handleModalVisible(true)}>
                删除
              </Button>
            </div>
            {/* <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.getColumns()}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              rowKey="id"
            /> */}
            <Table 
            rowKey = "id"
            loading={loading}
            dataSource={dataSource} 
            columns={this.getColumns()}
            rowSelection={rowSelection}
            
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
