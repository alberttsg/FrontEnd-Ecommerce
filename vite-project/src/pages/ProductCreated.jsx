import React from 'react'
import './productCreated.scss'

export const ProductCreated = ({ brand, name, category, image, price }) => {
  return (
    <div className='productCreated'>
        <h2>Producto creado</h2>
        <div><b>Brand:</b> { brand }</div>
        <div><b>Name:</b>{ name }</div>
        <div><b>Category:</b> { category }</div>
        <img src={image} />
        <div><b>Price:</b> { price } €</div>
    </div>
  )
}
