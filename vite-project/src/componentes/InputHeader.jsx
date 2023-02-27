import React from "react";
import { Input } from "antd";
import { SearchOutlined  } from "@ant-design/icons";
import './InputHeader.scss'

const InputHeader = () => {
  const { Search } = Input;

  return (
    <div className="container-input-header-class">
      <br />
      <br />
      <Search  
        prefix={<SearchOutlined  className='my-icon-search' />}
        placeholder='Busque producto'
        allowClear
        enterButton='Search'
        size='large'
        style={{ width: 400 }}
        className="input-header-class"
      />
    </div>
  );
};

export default InputHeader;
