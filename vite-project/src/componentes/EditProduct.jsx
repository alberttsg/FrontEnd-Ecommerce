import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form, Input } from "antd";
import { UserContext } from "../context/UserContext/UserState";
// import { useForm } from 'antd/lib/form/Form';

const EditProduct = ({ visible, setVisible}) => {

const {user, editUser} = useContext(UserContext);
const [form]= Form.useForm();


    useEffect(()=>{
        form.setFieldsValue(user)
    },[user])

  const onFinish = (values) => {
    console.log(values);
    editUser(values, user._id)
    setVisible(false);
  };
  return (
    <Modal form={form}  title='Edit User'  open={visible} onCancel={()=>setVisible(false)}  footer={[]}>
      <Form form={form} onFinish={onFinish} >
        <Form.Item label='User Name' name='username'>
          <Input placeholder='User name' />
        </Form.Item>

        <Form.Item label='email' name='email'>
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item label='role' name='role'>
          <Input placeholder='role' />
        </Form.Item>
        {/* <Form.Item label='password' name='password'>
          <Input.Password placeholder='Nueva Contraseña' />
        </Form.Item> */}
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
