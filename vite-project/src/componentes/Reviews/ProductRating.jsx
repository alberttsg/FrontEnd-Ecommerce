import { useEffect, useState } from 'react';
import { ReviewsDrawer } from './ReviewsDrawer';
import { getOverallRating, countProductReviews } from '../../logic/fetch';
import { Rate } from 'antd';

export default function ProductRating(props) {
  const { product } = props;
  const [overallRating, setOverallRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    async function getData() {
      const rating = await getOverallRating(product);
      const count = await countProductReviews(product);
      setOverallRating(rating);
      setReviewCount(count);
    };
    getData();
  }, [])

  return (
    <>
      <span onClick={openDrawer} >
        <Rate disabled allowHalf value={overallRating} />
        <span style={{margin: '0 10px'}} >({reviewCount} {reviewCount == 1 ? 'reseña' : 'reseñas'})</span>
      </span>
      <ReviewsDrawer product={product} isOpen={isDrawerOpen} toClose={onDrawerClose} />
    </>
  )
}