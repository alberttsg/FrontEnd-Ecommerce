import { ReviewCard } from './ReviewCard';
import { Space } from 'antd';

export function UserReviews(props) {
  const { product } = props;
  const { reviews } = product;

  return (
    <Space direction='vertical' style={{ display: 'flex' }} >
      {reviews.map((i, ind) => {
        <ReviewCard review={i} key={ind} loading={false} />
      })}
    </Space>
  )
}