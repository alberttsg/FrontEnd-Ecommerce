import { useEffect, useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { Space, Table } from 'antd';

const customReview = {
  user: {
    name: 'Pepe el enfadao',
    avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
  },
  title: 'Este producto es una mierda',
  rating: 2,
  commentary: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis quo animi blanditiis possimus doloremque. Quos ullam odit, recusandae modi possimus voluptatum. Quas eveniet laudantium consectetur magnam iure ad enim voluptatem.'
}

export function UserReviews(props) {
  const { product } = props;
  const [userReview, setUserReview] = useState(customReview);

  return (
    <Space direction='vertical' style={{ display: 'flex' }} >
      <Table
        showHeader={false}
      />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
      <ReviewCard review={userReview} />
    </Space>
  )
}