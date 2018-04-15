import React, { PureComponent } from "react";
import { connect } from "dva";
import { Row, Col, Spin, Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Switch } from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import { routerRedux } from 'dva/router';
import { getRequest } from "../../utils/UrlUtil";
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
@Form.create()
export default class UserEdit extends PureComponent {

  state = {
    id: null,
    edit:false,
  };

  componentDidMount() {
    const param = getRequest(this.props.location.search);
    const { dispatch } = this.props;
    if (param.id) {
      this.setState({
        id: param.id,
        edit:true,
      });
      dispatch({
        type: 'user/load',
        payload: param.id,
      });
    } else {
      this.resetForm();
    }
  }

  resetForm = (e) => {
    this.setState({
      id: null
    });
    this.props.form.setFieldsValue({ userName: "" });
    this.props.form.setFieldsValue({ code: "" });
    this.props.form.setFieldsValue({ gender: 1 });
    this.props.form.setFieldsValue({ name: "" });
    this.props.form.setFieldsValue({ phone: "" });
    this.props.form.setFieldsValue({ dept: "" });
    this.props.form.setFieldsValue({ email: "" });
    this.props.form.setFieldsValue({ status: 1 });
    this.props.form.setFieldsValue({ validDate: "" });
    this.props.form.setFieldsValue({ password: "" });
    this.props.form.setFieldsValue({ confirmPwd: "" });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.info("this.props.form",values);
        // values["memberId"] = this.state.id;
        // this.props.dispatch({
        //   type: this.state.id ? 'member/updateMember' : 'member/saveMember',
        //   payload: values,
        // });
        // this.resetForm();
        // this.props.dispatch({
        //   type: 'member/fetch',
        // });
        // window.history.go(-1);
      }
    });
  }

  handBack = (e) => {
    e.preventDefault();
    const { dispatch, match } = this.props;
    dispatch(routerRedux.push(`/manage/user/list`));
  }

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const titleConfig = {
      title: this.state.edit ? "编辑用户" : "新建用户"
    };
    const {user: {formData}} = this.props;
    const {loading } = this.props;

    return (
      <PageHeaderLayout {...titleConfig} >
        <Spin spinning={loading}>
        <Card bordered={false}>
          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form
                onSubmit={this.handleSubmit}
                style={{ marginTop: 8 }}
              >
                <FormItem
                  {...formItemLayout}
                  label="姓名"
                  hasFeedback
                >
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入用户姓名',
                    }], initialValue: formData.name
                  })(
                    <Input placeholder="姓名" />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="工号"
                  hasFeedback
                >
                  {getFieldDecorator('code', {
                    rules: [{
                      required: true, message: '请输入工号',
                    }], initialValue: formData.code
                  })(
                    <Input placeholder="工号" />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="账号"
                  hasFeedback
                >
                  {getFieldDecorator('userName', {
                    rules: [{
                      required: true, message: '请输入账号',
                    }], initialValue: formData.userName
                  })(
                    <Input placeholder="账号" />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="性别"
                >
                {getFieldDecorator('gender',{
                  initialValue: formData.gender
                })(
                  <RadioGroup>
                    <Radio value={1}>男</Radio>
                    <Radio value={0}>女</Radio>
                  </RadioGroup>
                )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="有效期"
                >
                  {getFieldDecorator('validDate', {
                    initialValue: moment(formData.validDate)
                  })(
                    <DatePicker style={{ width: '100%' }}/>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="科室"
                  hasFeedback
                >
                  {getFieldDecorator('dept', {
                    rules: [{
                      required: true, message: '请选择科室',
                    }], initialValue: formData.dept
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value={0}>呼吸内科</Option>
                      <Option value={1}>呼吸外科</Option>
                      <Option value={2}>消化外科</Option>
                      <Option value={3}>泌尿外科</Option>
                      <Option value={4}>信息科</Option>
                    </Select>
                  )}
                </FormItem>
                
              </Form>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form
                onSubmit={this.handleSubmit}
                style={{ marginTop: 8 }}
              >
                <FormItem
                  {...formItemLayout}
                  label="手机号"
                  hasFeedback
                >
                  {getFieldDecorator('phone', {
                    rules: [{
                      required: true, message: '请输入手机号',
                    }], initialValue: formData.phone
                  })(
                    <Input placeholder="手机号" />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="邮箱"
                >
                  {getFieldDecorator('email', {
                    initialValue: formData.email
                  })(
                    <Input placeholder="邮件" />
                  )}
                </FormItem>

                <FormItem
                {...formItemLayout}
                label="状态"
              >
                {getFieldDecorator('status',{
                initialValue: formData.status
                })(
                  <RadioGroup>
                  <Radio value={1}>启用</Radio>
                  <Radio value={0}>禁用</Radio>
                </RadioGroup>
                )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="密码"
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: !this.state.edit, message: '请输入密码',
                    }], initialValue: this.state.edit ? "111111":"" //编辑时不允许修改密码
                  })(
                    <Input  disabled={this.state.edit} type="password" placeholder="输入密码" />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="确认密码"
                >
                  {getFieldDecorator('confirmPwd', {
                    rules: [{
                      required: !this.state.edit, message: '确认密码',
                    }], initialValue: this.state.edit ? "1111111":""
                  })(
                    <Input  disabled={this.state.edit} type="password" placeholder="请输入确认密码" />
                  )}
                </FormItem>
              </Form>
            </Col>
          </Row>
          <Row gutter={24}>>
          <Col span={24} >
              <Form>
              <Form.Item
                  {...submitFormLayout}
                  style={{ marginBottom: 8 }}
                >
                  <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
                    保存
              </Button>
                  <Button onClick={this.handBack} style={{ marginLeft: 16 }}>
                    返回
            </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
        </Spin>
      </PageHeaderLayout>
    );
  }
}
