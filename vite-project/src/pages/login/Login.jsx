import React, { useContext, useEffect } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { UserContext } from "../../context/UserContext/UserState";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const onFinish = (values) => {
    login(values);
    navigate('/profile')
    notification.success({
      message: "Bienvenid@",
      placement: 'bottomRight',
    });
    navigate('/');
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <Form 
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="forms-container"><h1>Login</h1></div>
        <div className="forms-container">
          <label htmlFor="username">Username</label>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                pattern: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/,
                message: "Please enter a valid username. Must have at least one number, and between 6 and 15 characters.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="forms-container">
          <label htmlFor="password">Password</label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className="forms-container">
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
        </div>
        <div className="forms-container">
          <Form.Item
            // wrapperCol={{
            //   offset: 8,
            //   span: 16,
            // }}
          >
            <div className="btn-container">
              <Button className="btn-login" type="primary" htmlType="submit">
                Login
              </Button>
              <div>
                Or
              </div>
            <Link to={'/register'} > register now!</Link>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Login;
