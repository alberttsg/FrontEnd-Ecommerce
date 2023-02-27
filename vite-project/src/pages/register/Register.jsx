import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserContext } from '../../context/UserContext/UserState';
import { Link } from 'react-router-dom';
import { notification } from "antd";
import './register.scss';

const Register = () => {
  const { register } = useContext(UserContext);

  const onFinish = (values) => {
    register(values);
    notification.success({
      message: "Succesful register. Please Login Now!",
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className='register-container'>
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
        <div className="forms-container"><h1>Register</h1></div>
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
          <label htmlFor="email">E-mail</label>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div >
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
          </Form.Item>
        </div>

        <div className="forms-container"  >
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <div className="btn-container">
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              Or <Link to={'/login'}>login Now!</Link>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default Register;