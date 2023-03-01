import React from 'react'
import { useState } from 'react'
import { Modal } from 'antd';

export const ProductModal = (props) => {
    console.log(props)
    const {productID, productName, productPrice, productImg, status} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
  return (
    <Modal title="Basic Modal" mask={false} open={true} onOk={handleOk} onCancel={handleCancel}>
                     <p>{productName}</p>
                     <p>{productID}</p>
                     <p>{productImg}</p>
    </Modal>
  )
}
