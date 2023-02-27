import React, { useContext } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { UserContext } from "../../context/UserContext/UserState";
import { Link } from "react-router-dom";
import { notification } from "antd";

const Login = () => {
  const { login } = useContext(UserContext);

  const onFinish = (values) => {
    login(values);
    notification.success({
      message: "Bienvenid@",
    });
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
        <div><h1>Login</h1></div>
        <div>
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
        <div>
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
        <div>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
        </div>
        <div>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <div className="btn-container">
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              Or <Link to={'/register'} >register now!</Link>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Login;
