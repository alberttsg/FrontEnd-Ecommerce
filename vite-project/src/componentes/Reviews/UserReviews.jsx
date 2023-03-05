import { ReviewCard } from './ReviewCard';
import { Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { getNonUserReviews } from './reviewFetch';

export function UserReviews(props) {
  const { product, user } = props;
  const [reviews, setReviews] = useState(product.reviews);

  useEffect(() => {
    getNonUserReviews(product, user, setReviews);
  }, [user, product])

  if (reviews.length === 0) return <h3 style={{fontWeight: 'lighter', marginTop: '20px', color: 'grey'}} ><em>No hay reseñas.</em></h3>

  return (
    <Space direction='vertical' style={{ display: 'flex' }} >
      {reviews.map((item, index) =>
        <ReviewCard review={item} key={index} loading={false} />
      )}
    </Space>
  )
}