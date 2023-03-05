import { useState } from 'react';
import { ReviewsDrawer } from './ReviewsDrawer';
import { Rate } from 'antd';

export default function ProductRating(props) {
  const { product } = props;
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <span onClick={openDrawer} >
        <Rate disabled allowHalf value={product.overallRating} />
        <span style={{margin: '0 10px'}} >({product.reviewsCount} {product.reviewsCount == 1 ? 'reseña' : 'reseñas'})</span>
      </span>
      <ReviewsDrawer product={product} isOpen={isDrawerOpen} toClose={onDrawerClose} />
    </>
  )
}