import { useEffect, useState } from 'react';
import { ReviewsDrawer } from './ReviewsDrawer';
import { getOverallRating } from '../../logic/fetch';
import { Rate } from 'antd';

export function ProductRating(props) {
  const { product } = props;
  const [overallRating, setOverallRating] = useState(0);
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
      setOverallRating(rating);
    };
    getData();
  }, [])

  return (
    <>
      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '-20px' }} onClick={openDrawer} >
        <Rate disabled allowHalf value={overallRating} />
      </span>
      <ReviewsDrawer product={product} isOpen={isDrawerOpen} toClose={onDrawerClose} />
    </>
  )
}