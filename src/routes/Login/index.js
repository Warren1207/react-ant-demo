import React from 'react'
import './login.css'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react/index'
import { Form, Input,  Button, message } from 'antd';
import { post } from "../../libs/http";

@withRouter @inject('appStore') @observer @Form.create()
class Login extends React.Component {
   state = {

   }
   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          post("/Account/Login", values).then(res => {
            if (res.State === 0) {
              localStorage.setItem("report_app_token_react", res.Data.Token);
              const {from} = this.props.location.state || {from: {pathname: '/'}}
              this.props.history.push(from)
            } else {
              message.error(res.Message);
            }
          });
        }
      });
   }
   render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
     return(
      <div className="login-container">
        <div className="from-wrapper-outside"></div>
          <div className="login-from-wrapper">
            <div className="login-from-inner">
              <div className="login-from-icon"></div>
              <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-from">
                <Form.Item label="" >
                  {getFieldDecorator('UserName', {
                    rules: [ {
                      required: true, message: '用户名不能为空',
                    }],
                  })(
                    <Input placeholder='用户名' />
                  )}
                </Form.Item>
                <Form.Item label="" >
                  {getFieldDecorator('PassWord', {
                    rules: [ {
                      required: true, message: '密码不能为空',
                    }],
                  })(
                    <Input type='password' placeholder='密码' />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" style={{ width: '100%' }} htmlType="submit">登录</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
      </div>    
     )
   }
}
export default Login