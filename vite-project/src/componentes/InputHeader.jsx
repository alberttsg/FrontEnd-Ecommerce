import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined  } from "@ant-design/icons";
import './InputHeader.scss';
import { useNavigate } from 'react-router-dom';

const InputHeader = () => {
  const { Search } = Input;
  const navigate = useNavigate();

  return (
    <div className="container-input-header-class">
      <br />
      <br />
      <Search  
        prefix={<SearchOutlined  className='my-icon-search' />}
        placeholder='Busque producto'
        allowClear
        enterButton='Buscar'
        onSearch={(e) => navigate(`/search/${e}`)}
        loading={false}
        size='large'
        style={{ width: 400 }}
        className="input-header-class"
      />
    </div>
  );
};

export default InputHeader;
